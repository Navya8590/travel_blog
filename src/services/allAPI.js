import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverUrl";

// register API
export const registerAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/register`,reqBody)
}
// login api
export const loginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/login`,reqBody)
}

// add-blog
export const addBlogAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/add-blog`,reqBody,reqHeader)
}

// user blog
export const userBlogsAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/user-blogs`,{},reqHeader)
}

// all blogs
export const allBlogsAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/all-blogs`,{},reqHeader)
}

// /blogs/676685524090c66330afa878/edit
export const updateBlogAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_BASE_URL}/blogs/${id}/edit`,reqBody,reqHeader)
}

// remove blog
export const deleteBlogAPI = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_BASE_URL}/blogs/${id}/remove`,{},reqHeader)

}

///user/edit
export const updateUserAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_BASE_URL}/user/edit`,reqBody,reqHeader)
}