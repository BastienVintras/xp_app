/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getUser } from "@/lib/actionsUser"
import Image from "next/image"
import BadgePrenium from "@/public/badgePrenium.svg"
import { createSubscription } from "@/lib/actionsStripe"

export default function PagePayment () {

const itemsPrenium = [
  {name: "Hébergemement web fiable et sécurisé"},
  {name: "Conception responsive et conviviale"},
  {name: "Fonctionnalités avancées"},
  {name: "Support technique et mises à jour"},
]


return (
  <div className="max-w-lg mx-auto space-y-4 mt-3">
    <Card className="flex-flex-col ">
      <CardContent className="py-8">
        <div>
          <h3 className="text-md font-black uppercase bg-orange-900 bg-opacity-20 text-orange-500 p-3 rounded-md inline">Pass Premium</h3>
        </div>
        <div className="mt-4 text-6xl font-black ">
          <span>1.99€</span> <span className="text-sm text-muted-foreground">/ par mois</span>
        </div>
        <p className="mt-4 text-muted-foreground">Partager encore plus de données avec notre pass Premium et Profitez d'une experience unique !</p>
        <div className="flex-1 flex flex-col justify-between px6 py-6 bg-secondary rounded-lg m-1 space-t-6 p-3 mt-4">
          <ul className="space-y-3">
            {itemsPrenium.map((item, index)=> (
              <li key={index} className="flex items-center gap-2 text-muted-foreground">
                <span>✅</span>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
          <form className="w-full mt-4" action={createSubscription}>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full">Devenir membre premium</Button>
          </form>
        </div>
      </CardContent>
    </Card>
  </div>
)
}
