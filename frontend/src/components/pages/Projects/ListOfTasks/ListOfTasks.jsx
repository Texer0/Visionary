import Task from "../Task/Task"

function ListOfTasks({title, color}) {
    let taskAmount = [
        { title: 'Stage', color: '#FF1200', date_expiration: '28-Oct'},
        { title: 'In progress', color: '#aaaa11', date_expiration: '8-Jul'},
        { title: 'Completed', color: '#216E4E', date_expiration: '1-Apr'}
    ]

    const components = taskAmount.map((item, index) => (
        <Task title={item.title} color={item.color} date_expiration={item.date_expiration} ></Task>
      ))


    return (
        <div className={`p-4 pt-1 h-[80vh] w-[36vh] rounded-[60px] m-6
        bg-[${color}] shadow-[0px_0px_10px_10px_rgba(0,0,0,0.3)] bg-opacity-50`}>
            
            <div className="relative m-3 text-white font-bold text-2xl">
                <div>
                <span className="text-4xl float-start absolute top-[-5px] left-0 ">+</span>
                </div>
                <div>
                <span className="text-center">{title}</span>

                </div>
            </div>
            <div className="h-[85%] overflow-y-auto">
                {components}
            </div>
        </div>
    )
}

export default ListOfTasks