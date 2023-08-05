import { Navigate } from "react-router-dom";


export function getDateInDays(createdAt) {
  const diff = new Date(Date.now()).getTime() - new Date(createdAt).getTime();
  return Math.floor(diff / 1000 / 3600 / 24)
}

// const navigate = useNavigate()

export const toProfile = (id)=>{
  // Navigate(`/users/search/${id}`)
  console.log(id);
  return <Navigate to={`/users/search/${id}`} />
}

export const headers = {
  "Content-Type": "application/json; charset=UTF-8",
}

export const toPost = (id)=>{
  console.log(id);
  return <Navigate to={`/posts/search/${id}`} />
}


export const baseUrl = 'https://themoviesdata-com.onrender.com/api/v1'