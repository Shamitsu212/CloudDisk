export interface File {
     id: number;
     name: string;
     type: "Another" | "EXC" | "PDF" | "PIC" | "PP" | "Word" | "RAR";
     lastUpdate: string;
 };

export interface FileState {
    files: File[];
    
    loading: boolean;
    error: string | null;
}