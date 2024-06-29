
export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <hr />
            <p className="text-2xl">
            <span className="p-2 rounded bg-blue-500 text-white">{params.id}</span> </p>
            
        </div>
    )
}