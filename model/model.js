import { db } from '../config/db.js';
import { mybooks } from '../drizzle/schema.js';
import fs from 'fs/promises';
import path from 'path';
import { like, or } from "drizzle-orm";


export const savedatas = async (title,author,year,file) =>{
    const data = {title,author,year,book:file}
    await db.insert(mybooks).values(data);
}

export const showdata = () =>{
    const data = db.select().from(mybooks);
    return data;
}

export const deletedata = async (id,filename) =>{
    await db.delete(mybooks).where({id:id});
    const filePath = path.join('uploads', filename);
    try {
        await fs.unlink(filePath);
        //console.log(`File ${filename} deleted successfully`);
    } catch (err) {
        console.error(`Error deleting file ${filename}:`, err);
    }
}

export const editdata = async (id,filename) =>{
    const data = await db.select().from(mybooks).where({id:id});
    return data;
}

export const updatedata = async (id, title, author, year, file) =>{
    const data = {title,author,year,book:file}
    await db.update(mybooks).set(data).where({id:id});
}

export const statusdata = async (id) =>{
    return await db.select().from(mybooks).where({id:id});
}

export const updatestatus = async (id, status) =>{
    await db.update(mybooks).set({status:status}).where({id:id});
}

export const searchdata = async (search) =>{
    const searchTerm = `%${search}%`;
    const data = await db.select()
    .from(mybooks)
    .where(
      or(
        like(mybooks.title, searchTerm),
        like(mybooks.author, searchTerm)
      ))
    return data;
}