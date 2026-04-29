import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import NotesList from "../components/NotesList";


async function createNote(formData: FormData) {
  "use server";

  const session = await getServerSession();

  if(!session?.user?.email) return;

  const title = formData.get("title");
  const content = formData.get("content");
  

  const newNote = await prisma.note.create({
    data: {
      title: title as string,
      content: content as string,
      userId: session.user.email,
    },
  });


  return newNote;
  
}

async function deleteNote(id: number) {
  "use server";

  const session = await getServerSession();

  if(!session?.user?.email) return;

  await prisma.note.deleteMany({
    where: {
      id,
      userId: session.user.email,
    },
  });

  revalidatePath("/dashboard");
}

async function updateNote(formData: FormData) {
  "use server";

  const session = await getServerSession();

  if(!session?.user?.email) return;

  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await prisma.note.updateMany({
    where: {
      id,
      userId: session.user.email,
    },
    data: {
      title,
      content,
    },
  });

  revalidatePath("/dashboard");
}

export default async function DashboardPage() {
    
    async function getNotes() {
      const session = await getServerSession();

      if(!session?.user?.email) return [];

      return prisma.note.findMany({
        where: {
          userId: session.user.email,
        },
        orderBy: {
          createdAt: "desc",
        },
        
      });
    }

    const notes = await getNotes();
    

  return (
    <div>
      

      <NotesList 
        initialNotes={notes} 
        updateNote={updateNote}
        deleteNote={deleteNote}
        createNote={createNote}
      />
      

    </div>
  );
}