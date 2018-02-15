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
        let tableElement = document.getElementById(this.element);
        let tbodyElement = document.createElement('tbody');

        let getClassName = (index, data) => {
            return data[index].class_name;
        };

        let getKey = (index, data) => {
            return data[index].data;
        };

        let createTdElement = (obj) => {
            let _className = obj.class_name;
            let _style = obj.style;
            let _colspan = obj.colspan;
            let _text = obj.text;
            let cell = document.createElement('td');
            cell.classList.add(_className);
            cell.innerHTML = _text;
            cell.colSpan = _colspan;
            return cell;
        };

        if (this.dataLength > 0) {
            let columns = this.columns;
            (this.data).forEach((element) => {
                let trElement = document.createElement('tr');
                (columns).forEach((el, j) => {
                    let dataKey = getKey(j, columns);
                    let className = getClassName(j, columns);
                    let cell = '';
                    if (typeof (dataKey) === 'function') {
                        cell = dataKey(element);
                    } else {
                        cell = element[dataKey];
                    }
                    let tdElement = createTdElement({
                        class_name: className,
                        text: cell
                    });
                    trElement.appendChild(tdElement);
                });
                tbodyElement.appendChild(trElement);
            });
        } else {
            let text = this.noDataText;
            let trElement = document.createElement('tr');
            let tdElement;
            tdElement = createTdElement({
                text: text,
                colspan: this.columnsLength,
                style: {
                    align: 'center'
                }
            });
            trElement.appendChild(tdElement);
            tbodyElement.appendChild(trElement);
        }
        tableElement.removeChild(tableElement.getElementsByTagName('tbody')[0]);
        tableElement.appendChild(tbodyElement);
    }

    getRowData(index) {
        return this.data[index];
    }
}
