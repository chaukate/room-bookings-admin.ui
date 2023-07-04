interface ITableProps {
    header: string[],
    body: string[]
}

export const Table = ({tableHeader , tableBody }: any) => {
    console.log(tableBody,tableHeader)
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Sr</th>
                        {tableHeader?.map((item : any,index: number)=>
                            <th scope="col" className="px-6 py-3" key={index}>
                            {item.Head}
                        </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {tableBody?.map((body: any,i : number)=> 
                     <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={i}>
                        <td className="px-6 py-4">{i+1}</td>
                        {tableHeader?.map((item : any,index: number)=>
                           <td className="px-6 py-4" key={index}>
                                {body[item.FieldName]}
                            </td>
                        )}
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};