"use client";
import { useState, useEffect } from 'react';
import mime from 'mime-types';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";

type FileItem = {
  id: string;
  name: string;
  type: 'file' | 'directory';
  size: string;
  modified: string;
};

const formatSize = (size: number) => {
  if (size >= 1e9) return `${(size / 1e9).toFixed(1)} GB`;
  if (size >= 1e6) return `${(size / 1e6).toFixed(1)} MB`;
  if (size >= 1e3) return `${(size / 1e3).toFixed(1)} KB`;
  return `${size} B`;
};

const FolderIcon = () => (
  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const menuItemClass = `
  hover:bg-gray-100 
  active:bg-gray-200
  rounded-md 
  mx-2 
  px-3 
  py-1.5 
  transition-colors
  focus:outline-none 
  cursor-pointer
  text-sm
  text-gray-700
`;

export default function FileManager() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [contextMenuTarget, setContextMenuTarget] = useState<{ type: 'file' | 'space', id?: string }>({ type: 'space' });
  const [path, setPath] = useState<string>('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`/api/files/${path}`);
        const data = await response.json();
        const formattedData = data.map((file: any) => ({
          id: file.name,
          name: file.name,
          type: file.type,
          size: file.size !== undefined ? formatSize(file.size) : '-',
          modified: file.last_modified,
        }));
        setFiles(formattedData);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, [path]);

  const handleRename = () => {
    if (contextMenuTarget.type === 'file') {
      setRenamingId(contextMenuTarget.id || null);
    }
  };

  const handleDelete = () => {
    if (contextMenuTarget.type === 'file') {
      setFiles(files.filter(f => f.id !== contextMenuTarget.id));
    }
  };

  const handleNewFile = () => {
    const newFile: FileItem = {
      id: Date.now().toString(),
      name: '新建文件',
      type: 'file',
      size: '0 KB',
      modified: new Date().toISOString().split('T')[0]
    };
    setFiles(prev => [...prev, newFile]);
  };

  const saveRename = (newName: string) => {
    setFiles(files.map(f => 
      f.id === renamingId ? { ...f, name: newName } : f
    ));
    setRenamingId(null);
  };

  const handleFolderClick = (folderName: string) => {
    setPath(prevPath => prevPath ? `${prevPath}/${folderName}` : folderName);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="relative min-h-[400px] rounded-lg border border-gray-200 p-4">
          <div className="grid grid-cols-9 gap-4 text-sm text-gray-500 font-medium border-b pb-2 mb-2">
            <div className="col-span-6">名称</div>
            <div className="col-span-1">类型</div>
            <div className="col-span-1">大小</div>
            <div className="col-span-1">修改日期</div>
          </div>

          {files.map(file => (
            <div 
              key={file.id}
              className="grid grid-cols-9 gap-4 items-center p-2 hover:bg-gray-50 rounded"
              onContextMenuCapture={() => setContextMenuTarget({ type: 'file', id: file.id })}
              onClick={() => file.type === 'directory' && handleFolderClick(file.name)}
            >
              <div className="col-span-6 flex items-center">
                {renamingId === file.id ? (
                  <Input
                    autoFocus
                    defaultValue={file.name}
                    onBlur={(e) => saveRename(e.target.value)}
                    className="h-8 px-2 py-1 text-sm"
                  />
                ) : (
                  <>
                    {file.type === 'directory' ? <FolderIcon /> : <FileIcon />}
                    {file.name}
                  </>
                )}
              </div>
              <div className="col-span-1">
                {file.type === 'directory' 
                  ? '目录' 
                  : (() => {
                      const mimeType = mime.lookup(file.name);
                      if (typeof mimeType === 'string') {
                        return mimeType.split('/')[0];
                      }
                      return '未知';
                    })()}
              </div>
              <div className="col-span-1">{file.size}</div>
              <div className="col-span-1">{file.modified}</div>
            </div>
          ))}
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent 
        className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg py-2 w-48 space-y-1"
        onInteractOutside={() => setContextMenuTarget({ type: 'space' })}
      >
        {contextMenuTarget.type === 'file' ? (
          <>
            <ContextMenuItem 
              className={menuItemClass}
              onSelect={handleRename}
            >
              重命名
            </ContextMenuItem>
            <ContextMenuItem 
              className={menuItemClass}
              onSelect={handleDelete}
            >
              删除
            </ContextMenuItem>
            <ContextMenuItem className={menuItemClass}>
              复制链接
            </ContextMenuItem>
          </>
        ) : (
          <ContextMenuItem 
            className={menuItemClass}
            onSelect={handleNewFile}
          >
            新建文件
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
