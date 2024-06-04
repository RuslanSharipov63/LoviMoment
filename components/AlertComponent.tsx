import { FC } from "react"
import { Terminal } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

type AlertComponentProp = {
    textTitle: string
    textDescription: string
}




const AlertComponent: FC<AlertComponentProp> = ({
    textTitle,
    textDescription,
}) => {
  return (
    <Alert className="w-4/5 mr-4  sm:w-64 ml-2">
      <Terminal className="h-4 w-4" />
      <AlertTitle>{textTitle}</AlertTitle>
      <AlertDescription>
       {textDescription}
      </AlertDescription>
    </Alert>
  )
}

export default AlertComponent;