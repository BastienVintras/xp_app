import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { CreateNote } from "@/lib/actionsNotes"

export default function CreatePage() {


  return (
    <Card>
        <form action={CreateNote}>
            <CardHeader>
                <CardTitle>Nouvelle note</CardTitle>
                <CardDescription>Quelques mots pour ne pas oublier</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-5">
                <div className="gap-y-2 flex flex-col">
                    <Label htmlFor="title">Titre</Label>
                    <Input type="text" name="title" id="title" required placeholder="Titre de votre note"/>
                </div>
                <div className="gap-y-2 flex flex-col">
                    <Label htmlFor="title">Description</Label>
                    <Textarea name="description" id="description" required placeholder="Description de votre note"/>
                </div>
                <div className="gap-y-2 flex flex-col">
                    <Label  htmlFor="completed">En attente | Complet</Label>
                    <Input type="checkbox" name="completed" id="completed" className="w-6 cursor-pointer" />
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <Button type="button" className="bg-red-500 hover:bg-red-600 text-white">
                    <Link href="/dashboard/notes">Annuler</Link>
                </Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                    Créer la note
                </Button>
            </CardFooter>
        </form>
    </Card>
  )
}
