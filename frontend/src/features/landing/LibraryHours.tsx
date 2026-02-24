

export const LibraryHours:React.FC = () => {
    return (
        <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-blue-200">
        <h3 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Library Hours
        </h3>

        <table className="w-full border-collapse text-gray-700 text-base">
                <tbody>
                    <tr>
                        <td>Monday</td>
                        <td>10AM : 6PM</td>
                    </tr>
                    <tr>
                        <td>Tuesday</td>
                        <td>10AM : 6PM</td>
                    </tr>
                    <tr>
                        <td>Wednesday</td>
                        <td>10AM : 6PM</td>
                    </tr>
                    <tr>
                        <td>Thursday</td>
                        <td>10AM : 6PM</td>
                    </tr>
                    <tr>
                        <td>Friday</td>
                        <td>10AM : 6PM</td>
                    </tr>
                    <tr>
                        <td>Saturday</td>
                        <td>10AM : 6PM</td>
                    </tr>
                    <tr>
                        <td>Sunday</td>
                        <td>10AM : 6PM</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    )
}