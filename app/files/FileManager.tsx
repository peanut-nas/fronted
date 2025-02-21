"use client";
import { useState } from 'react';
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
  type: 'file' | 'folder';
  size: string;
  modified: string;
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
  const [files, setFiles] = useState<FileItem[]>([
    { id: '1', name: '文档', type: 'folder', size: '-', modified: '2024-03-15' },
    { id: '2', name: '图片.jpg', type: 'file', size: '2.4 MB', modified: '2024-03-14' },
  ]);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [contextMenuTarget, setContextMenuTarget] = useState<{ type: 'file' | 'space', id?: string }>({ type: 'space' });

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

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="relative min-h-[400px] rounded-lg border border-gray-200 p-4">
          <div className="grid grid-cols-12 gap-4 text-sm text-gray-500 font-medium border-b pb-2 mb-2">
            <div className="col-span-6">名称</div>
            <div className="col-span-2">类型</div>
            <div className="col-span-2">大小</div>
            <div className="col-span-2">修改日期</div>
          </div>

          {files.map(file => (
            <div 
              key={file.id}
              className="grid grid-cols-12 gap-4 items-center p-2 hover:bg-gray-50 rounded"
              onContextMenuCapture={() => setContextMenuTarget({ type: 'file', id: file.id })}
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
                    {file.type === 'folder' ? <FolderIcon /> : <FileIcon />}
                    {file.name}
                  </>
                )}
              </div>
              <div className="col-span-2">{file.type}</div>
              <div className="col-span-2">{file.size}</div>
              <div className="col-span-2">{file.modified}</div>
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
