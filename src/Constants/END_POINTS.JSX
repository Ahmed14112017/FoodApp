export const BASE_URL="https://upskilling-egypt.com:3006/api/v1"
export const BASE_USERS=`${BASE_URL}/Users`;
export const USERS_URL={
    login:`${BASE_USERS}/Login`,
    register:`${BASE_USERS}/Register`,
    delete:(id)=>`${BASE_USERS}/${id}`,
    resetRequest:`${BASE_USERS}/Reset/Request`,
    reset:`${BASE_USERS}/Reset`,
    verify:`${BASE_USERS}/verify`

}

 const BASE_CAT=`${BASE_URL}/Category`
 export const CATEGORIES_URL={
    getlist:`${BASE_CAT}`,
    delete:(id)=>`${BASE_CAT}/${id}`,
    create:`${BASE_CAT}`
 }

 const BASE_REC=`${BASE_URL}/Recipe`
 export const RECIPE_URL={
    getlist:`${BASE_REC}`,
    delete:(id)=>`${BASE_REC}/${id}`,
    create:`${BASE_REC}/`
 }
 const BASE_USERREC=`${BASE_URL}/users/`
 export const USERREC_URL={
    getlist:`${BASE_USERREC}`,
    delete:(id)=>`${BASE_USERREC}/${id}`
 }

 const BASE_USERRECIPEFAV=`${BASE_URL}/userRecipe`
 export const USERRECIPEFAV_url={
   getlist:`${BASE_USERRECIPEFAV}`,
   addfavorites:`${BASE_USERRECIPEFAV}`,
   delete:(id)=>`${ BASE_USERRECIPEFAV}/${id}`
 }

export const GETALL_TAGES=`${BASE_URL}/tag/`

export const IMAGE_URL="https://upskilling-egypt.com:3006"