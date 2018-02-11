'use strict';
class SimpleTable {
    constructor(config) {
        this.element = config.element;
        this.data = config.data;
        this.columns = config.columns;
        this.dataLength = config.data.length;
        this.noDataText = config.no_data_text;
        this.columnsLength = this.columns.length;
    }

    createBody() {
        let htmlRows = '';
        let elementRows = document.createElement('tbody');

        let getClassName = (index, data) => {
            return data[index].class_name;
        };

        let getKey = (index, data) => {
            return data[index].data;
        };

        let createCell = (obj) => {
            let _className = obj.class_name;
            let _style = obj.style;
            let _colspan = obj.colspan;
            let _text = obj.text;
            let cell = document.createElement('td');
            let text = document.createTextNode(_text);
            cell.classList.add(_className);
            cell.appendChild(text);
            return cell;
        };

        if (this.dataLength > 0) {
            for (let i in this.data) {
                let dataRow = this.data[i];
                let columns = this.columns;
                let htmlColumns = '';
                let elementColumns = document.createElement('tr');
                for (let j in columns) {
                    let dataKey = getKey(j, columns);
                    let className = getClassName(j, columns);
                    let cell = '';
                    let elementCell;
                    if (typeof (dataKey) === 'function') {
                        cell = dataKey(dataRow);
                    } else {
                        cell = dataRow[dataKey];
                    }
                    elementCell = createCell({
                        class_name: className,
                        text: cell
                    });
                    elementColumns.appendChild(elementCell);
                    // htmlColumns += `<td class="${className}">${cell}</td>`;
                }
                elementRows.appendChild(elementColumns);
                // htmlRows += `<tr>${htmlColumns}</tr>`;
            }
            this.htmlBody = elementRows;
        } else {
            let text = this.noDataText;
            htmlRows = `<tr>
                            <td style="text-align: center;" colspan="${this.columnsLength}">${text}</td>
                        </tr>`;
            this.htmlBody = htmlRows;
        }
        return this.htmlBody;
    }

    getRowData(index) {
        return this.data[index];
    }
}