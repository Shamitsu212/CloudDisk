export interface Folder {

    id: number,
    user_id:  number,

    name: string,
    files: number[],

    lastUpdate: string

    isFavorite: boolean;
}

export interface FolderState {
    
    folders: Folder[];

    loading: boolean;
    error: string | null;
}