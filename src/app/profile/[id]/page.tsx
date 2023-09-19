export default function UserProfile({ params }: any) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-xl">Profile Page for User {params.id}</p>
        </div>
    )
}