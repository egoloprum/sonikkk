import { Loader2 } from "lucide-react"

const loading = ({}) => {
  setTimeout(() => console.log("Data fetched"), 20000);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader2 className='animate-spin h-10 w-10' />
    </div>
  )
}

export default loading
