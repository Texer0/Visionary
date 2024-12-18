import ListOfTasks from "../ListOfTasks/ListOfTasks"

function Project() {

    let listsAmount = [
        { title: 'Stage', color: '#FF1200'}, 
        { title: 'In progress', color: '#aaaa11'},
        { title: 'Completed', color: '#216E4E'}
    ]

    const components = listsAmount.map((item, index) => (
        <ListOfTasks title={item.title} color={item.color} ></ListOfTasks>
      ))

    return (
        <div className="text-white flex flex-row overflow-x-auto">
            {components}
        </div>
    )
}

export default Project