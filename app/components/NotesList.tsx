"use client";

import { useState } from "react";
import EditNote from "./EditNote";
import SubmitButton from "./SubmitButton";
import toast from "react-hot-toast";

export default function NotesList({
  initialNotes,
  updateNote,
  deleteNote,
  createNote,
}: any) {
  const [notes, setNotes] = useState(initialNotes);
  const [expandedNotes, setExpandedNotes] = useState<{ [key: number]: boolean }>({});

  return (

    <div className="space-y-6 max-w-5xl mx-auto">
        
        <form
            action={async (formData) => {
                const title = formData.get("title");
                const content = formData.get("content");

                const tempId = Date.now(); // Generate a temporary ID based on timestamp

                // 1. Create optimistic note
                const tempNote = {
                    id: tempId, // temporary ID
                    title,
                    content,
                };

                // Add temp Note to UI immediately
                setNotes((prev: any) => [tempNote, ...prev]);

                try {
                    // 3. Send to server
                    const newNote = await createNote(formData);
                    toast.success("Note created successfully");

                    setNotes((prev: any) => prev.map((n: any) => n.id === tempId ? newNote : n)); // Replace temp note with real note from server
                } catch (error) {
                    toast.error("Failed to create note");

                    // rollback UI by removing temp note
                    setNotes((prev: any) => prev.filter((n: any) => n.id !== tempId));
                }

                
            } }
            className="bg-white p-4 rounded-lg shadow-md space-y-3 w-full"
        >
            <input name="title" placeholder="Enter note title" className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <textarea name="content" placeholder="Enter note content" className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 h-24 resize-none" />

            <SubmitButton />
        </form>
        {notes.length === 0 ? (
            <p className="text-center text-gray-400 py-10">
                You don’t have any notes yet. Start by creating one above ✍️
            </p>
            ):
            <h2 className="text-2xl">Notes</h2>
        }
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {notes.map((note: any) => (

                <div key={note.id} className="bg-white p-4 rounded-lg shadow-sm border flex flex-col justify-between">

                    <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
                    <p className="text-gray-600 mt-1">
                        {expandedNotes[note.id]
                            ? note.content
                            : note.content.slice(0, 100) + (note.content.length > 100 ? "..." : "")
                        }
                    </p>

                    {note.content.length > 100 && (
                        <button
                            className="text-blue-500 text-sm mt-1"
                            onClick={() =>
                            setExpandedNotes((prev) => ({
                                ...prev,
                                [note.id]: !prev[note.id],
                            }))
                            }
                        >
                            {expandedNotes[note.id] ? "Show less" : "Read more"}
                        </button>
                    )}


                    <div className="flex gap-2 mt-3">
                        <EditNote note={note} updateNote={updateNote} setNotes={setNotes} />
                        <form
                          action={async () => {
                              setNotes((prev: any) => prev.filter((n: any) => n.id !== note.id));
                              
                              try {
                                await deleteNote(note.id);
                                toast.success("Note deleted successfully");
                              } catch (error) {
                                toast.error("Failed to delete note");
                              }
                          } }>
                          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                              Delete Note
                          </button>
                      </form>
                    </div>
                      

                      
                </div>
            ))}
        </div>
    </div>
  );
}