import { IpcMainEvent, IpcMainInvokeEvent } from "electron";
import fs from "fs";

interface DirOrFile{
    name:string;
    isDir:boolean;
    path:string;
    id:number;
}

const rootPath :string = process.platform === "win32" || process.arch != 'arm' ? process.cwd() + "/temp/USB" : "/media/pi"

async function readDir (event:IpcMainInvokeEvent,path: string) : Promise<DirOrFile[]> {

    var list : DirOrFile[] = []
    if(!fs.existsSync(path))
        return []
    fs.readdirSync(path,{withFileTypes:true}).forEach((value: fs.Dirent,index:number)=>{
        list.push({
            name: value.name,
            isDir: value.isDirectory(),
            path: path + '/' + value.name,
            id: index
        })
    })
    return list
}

async function getUSBPath() {
    let tmp = fs.readdirSync(rootPath,{withFileTypes:true}).filter((value:fs.Dirent)=>{
        return value.isDirectory() && !value.name.match("recoveryfs[0-9]*")
    })

    if(tmp.length == 0)
        return ""
    else
        return rootPath + '/' + tmp[0].name
}

export {readDir,getUSBPath}
export type { DirOrFile }