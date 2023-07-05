interface IInput {
    name: string,
    onChange?: any,
    value?: any,
    label: string
}

export const TextInput: React.FC<IInput> = ({ name, onChange, value, label }) => {
    return (
        <div className="sm:col-span-12">
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
            <div className="mt-2">
                <input type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    name={name}
                    id={name}
                    autoComplete={name}
                    onChange={onChange}
                    value={value} />
            </div>
        </div >
    );
};

export const TextAreaInput: React.FC<IInput> = ({ name, onChange, value, label }) => {
    return (
        <div className="sm:col-span-12">
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
            <div className="mt-2">
                <textarea className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    name={name}
                    id={name}
                    autoComplete={name}
                    onChange={onChange}
                    value={value} />
            </div>
        </div>
    );
};

export const NumberInput: React.FC<IInput> = ({ name, onChange, value, label }) => {
    return (
        <div className="sm:col-span-12">
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
            <div className="mt-2">
                <input type="number"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    name={name}
                    id={name}
                    autoComplete={name}
                    onChange={onChange}
                    value={value} />
            </div>
        </div>
    );
};

export const BooleanInput: React.FC<IInput> = ({ name, onChange, value, label }) => {
    return (
        <div className="sm:col-span-12">
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
            <div className="mt-2">
                <input type="checkbox"
                    className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    name={name}
                    id={name}
                    autoComplete={name}
                    onChange={onChange}
                    checked={value}
                    value={value} />
            </div>
        </div>
    );
};


export const InputSelect: React.FC<IInput> = ({ name, onChange, value, label }) => {
    return (
        <div className="sm:col-span-12">
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select id={name} onChange={onChange} 
                name={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option defaultValue=''>Choose Lead</option>
                {
                    value?.map((item: any)=> 
                    <option value={item.id} key={item.id}>{item.name}</option>
                )}
            </select>
        </div>
    );
};


