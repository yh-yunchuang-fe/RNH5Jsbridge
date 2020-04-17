import { ReactNode } from 'react'

export interface IHeaderProps {
    needGoBack: boolean,
    onBack?: (x?: any) => void,
    leftView?: ReactNode,
    rightView?: ReactNode
}
