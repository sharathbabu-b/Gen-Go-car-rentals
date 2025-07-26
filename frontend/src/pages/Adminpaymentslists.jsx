import React from "react";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchPayments } from "../slices/paymentSlices";
import { Loader2 } from "lucide-react";
export default function AdminpaymentList(){
    const dispatch=useDispatch()
    const {paymentlist,loading}=useSelector((state)=>state.payment)
    useEffect(()=>{
        dispatch(fetchPayments())
    },[dispatch])
    return (
        <div className="container mx-auto p-4 bg-white dark:bg-gray-900 text-black dark:text-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Payments List</h2>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin h-8 w-8" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Booking ID</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pmt) => (
                <tr key={pmt._id} className="text-center">
                  <td className="border px-4 py-2">
                    {pmt?.userId?.name || 'N/A'} <br />
                    <small>{pmt?.userId?.email}</small>
                  </td>
                  <td className="border px-4 py-2">{pmt.bookingId}</td>
                  <td className="border px-4 py-2">₹{pmt.amount}</td>
                  <td className="border px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                      pmt.paymentStatus === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {pmt.paymentStatus}
                    </span>
                  </td>
                  <td className="border px-4 py-2">{new Date(pmt.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
    

}