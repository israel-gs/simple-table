# simple-table
It is a simple generator of html tables written in javascript.

## How to use

```javascript
//you need a json array with your data.
let usersData = [
    {
        name: 'Name1',
        lastname: 'Lastname1',
        username: 'user1'
    },
    {
        name: 'Name2',
        lastname: 'Lastname2',
        username: 'user2'
    },
    {
        name: 'Name3',
        lastname: 'Lastname3',
        username: 'user3'
    }
];
```
```javascript
//you need to instantiate the class.
let tableUser = new SimpleTable({
            element: '#tbl-example', //id from the table
            data: usersData,
            no_data_text: 'No data.',
            columns: [
                {data: 'name', class_name: 'text-center'},
                {data: 'lastname', class_name: 'text-center'},
                {
                    data: function(data) {
                        return `<span>${data.username}</span>`;
                    }, 
                    class_name: 'text-center'
                }
            ]
        });
        
//then execute the method createBody
tableUser.createBody();
```
<a href="https://codepen.io/IsraelGS/project/editor/ZLPEEd" target="_blank">Run in codepen</a>
