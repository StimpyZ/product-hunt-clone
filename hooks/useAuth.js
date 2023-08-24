import { useContext } from 'react'
import { FirebaseContext } from '../context/FirebaseContext'

export default function useAuth () {

    return useContext(FirebaseContext)

}
