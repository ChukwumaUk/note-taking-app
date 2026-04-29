"use client"

import { useState } from "react";
import toast from "react-hot-toast";

export default function EditNote({note, updateNote, setNotes}: any) {
    const [isEditing, setIsEditing] = useState(false);

    if(!isEditing) {
        return (
           <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded" onClick={() => setIsEditing(true)}>Edit</button>
        )
    }

    async function handleSubmit(formData: FormData) {
        const title = formData.get("title");
        const content = formData.get("content");

        setNotes((prev: any) => prev.map((n: any) => n.id === note.id ? {...n, title, content} : n));

        
        try {
            await updateNote(formData);
            toast.success("Note updated successfully");
        } catch (error) {
            toast.error("Failed to update note");
        }
        setIsEditing(false);
    }

    return (
        <form action={handleSubmit} className="flex flex-col gap-2">
            <input type="hidden" name="id" value={note.id} />
            <input type="text" name="title" defaultValue={note.title} className="border p-2 rounded" />
            <textarea name="content" defaultValue={note.content} className="border p-2 rounded" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </form>
    );
}