import React from 'react'

const statusDisplay = ({status}:{status:string}) => {
  
  const getColor = (status:string) => {
    let color="bg-slate-700"
    switch (status.toLowerCase()) {
      case "done":
        color="bg-green-200"
        break;
      case "started":
        color="bg-yellow-200"
        break;
      case "not started":
        color="bg-red-200"
        break;
    }
    return color
  }
  return (
    <span className={`inline-block rounded-full px-2 py-1 text-xs font-semiblod text-gray-700 bg-green-200 ${getColor(status)}`}>{status}</span>
  )
}

export default statusDisplay