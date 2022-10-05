//Source: https://javascript.plainenglish.io/creating-a-dynamic-html-table-through-javascript-f554fba376cf
const tableDiv = document.querySelector("div.table")

let tableHeaders = ["Resource Name", "Resource Type", "Next Review", "Compliance", "Edit"]

const createTable = () => {
    while (tableDiv.firstChild) tableDiv.removeChild(tableDiv.firstChild)

    let excTable = document.createElement('table')
    excTable.className = 'excTable'

    let excTableHead = document.createElement('thead')
    excTableHead.classNamee = 'excTableHead'

    let excTableHeaderRow = document.createElement('tr')
    excTableHeaderRow.className = 'excTableHeaderRow'

    tableHeaders.forEach(header => {
        let scoreHeader = document.createElement('th')
        scoreHeader.innerText= header
        excTableHeaderRow.append(scoreHeader)
    })

    excTableHead.append(excTableHeaderRow) // Appends the header row to the table header group element
    excTable.append(excTableHead)
    let excTableBody = document.createElement('tbody') // Creates the table body group element
    excTableBody.className = "scoreboardTable-Body"
    excTable.append(excTableBody) // Appends the table body group element to the table
    tableDiv.append(excTable) // Appends the table to the scoreboard div

    const appendData = (singleData, singleDataIndex) => {
        const excTable = document.querySelector('.excTable') // Find the table we created
        let excTableBodyRow = document.createElement('tr') // Create the current table row
        excTableBodyRow.className = 'excTableBodyRow'
// Lines 72-85 create the 5 column cells that will be appended to the current table row
        let idData = document.createElement('td')
        idData.innerText = singleDataIndex
        let nameData = document.createElement('td')
        nameData.innerText = singleData.name
        let typeData = document.createElement('td')
        typeData.innerText = singleData.type
        let reviewData = document.createElement('td')
        reviewData.innerText = singleData.review
        let compData = document.createElement('td')
        compData.innerText = singleData.compliance
        let edit = document.createElement('td')
        edit.innerText = singleData.edit
        excTableBodyRow.append(idData, nameData, typeData, reviewData, compData, edit) // Append all 5 cells to the table row
        excTable.append(excTableBodyRow) // Append the current row to the scoreboard table body
    }

    const getData = () => {
        fetch('https://itp.vlee.me.uk/session/login')
            .then(res => res.json())
            .then(data => {
                createTable()

                for (const item of data){
                    let dataIndex = data.indexOf(item) + 1
                    appendData(data, dataIndex)
                }
            })
    }
}