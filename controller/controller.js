import { deletedata, editdata, savedatas, searchdata, showdata, statusdata, updatedata, updatestatus } from "../model/model.js";
import fs from 'fs/promises';
import path from 'path';

export const gethtml = async (req,res) =>{
    const datas = await showdata();
    //console.log(datas);
    //console.log(datas.length);

    res.render('index', {datas, counts: datas.length});
}

export const getaddhtml = (req,res) =>{
    res.render('add');
}

export const getedithtml = (req,res) =>{
    res.render('edit');
}

export const savedata = async (req,res) =>{
   const {title, author, year} = req.body;
   if(!title || !author || !year){
    return res.redirect('/?msg=invalid');
}
if (isNaN(Number(year))) {
    return res.redirect('/?msg=noYear');
}
   if (req.file === undefined) {
        return res.redirect('/?msg=noFile');
    }
    const file = req.file.filename;
    //console.log(title, author, year, file);
    await savedatas(title, author, year, file);
    res.redirect('/?msg=success');
}

export const deletebook = async (req,res) =>{
    const id = req.params.id;
    const filename = req.params.filename;
    //console.log(filename);
    //console.log(id);
    await deletedata(id,filename);
    res.redirect('/?msg=deleted');
}

export const editbook = async (req,res) =>{
    const id = req.params.id;
    //console.log(id);
    const data = await editdata(id);
    //console.log(data);
    if(!data[0]){
        return res.redirect('/404');
    }
    res.render('edit', {data});
}

export const updatebook = async (req,res) =>{
    const id = req.params.id;
    const previousFile = req.params.files;
    const {title, author, year} = req.body;
    let files;
    if(!req.file){
        files = previousFile;
    }
    else{
        files = req.file.filename;
    }
    //console.log(title, author, year, files);
    await updatedata(id, title, author, year, files);
    if (files !== previousFile) {
        const filePath = path.join('uploads', previousFile);
        try {
            await fs.unlink(filePath);
            console.log(`File ${previousFile} deleted successfully`);
        } catch (err) {
            console.error(`Error deleting file ${previousFile}:`, err);
        }
    }
    res.redirect('/?msg=updated');

}

export const statusbook = async (req,res) =>{
    const id = req.params.id;
    const data = await statusdata(id);
    const stat = data[0].status;
    if(data[0].status === 'Unread'){
        await updatestatus(id, data[0].status="Read");
    }
    else{
        await updatestatus(id, data[0].status="Unread");
    }
    res.redirect(`/?msg=${stat}`);
}

export const searchbook = async (req,res) =>{
    const {search} = req.body;
    console.log(search);
    const datas = await searchdata(search);
    res.render('index', {datas, counts: datas.length});
}

export const pdfreader = async (req,res) =>{
    const id = req.params.id;
    const data = await editdata(id);
    console.log(data);
    if(!data[0]){
        return res.redirect('/404');
    }
    res.render('pdfreader', {data});
}