export type list={
    "id"?: number,
    "list_name"?:string,
    "description"?: string,
    "admin"?: string,
    "itemList"?: itemList[]
}

export type itemList={
    "name"?:string,
    "status"?:string
}