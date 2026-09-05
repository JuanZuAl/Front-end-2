function Header({title, description, txtButton, onButtonClick}) {
    if (!txtButton) {
        return (
            <div className =" flex justify-between items-center mb-8 p-6">
                <div>
                    <h1 className="text-4xl font-bold text-slate-800">{title}</h1>
                    <p className ="text-slate-500 mt-1">{description}</p>
                </div>
            </div>
        );
    }
    return (
        <div className =" flex justify-between items-center mb-8 p-6">
            <div>
                <h1 className="text-4xl font-bold text-slate-800">{title}</h1>
                <p className ="text-slate-500 mt-1">{description}</p>
            </div>
            <div>
                <button onClick={onButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg font-sans cursor-pointer">
                    {txtButton}
                </button>
            </div>
        </div>
        
    );
   
}

export default Header;