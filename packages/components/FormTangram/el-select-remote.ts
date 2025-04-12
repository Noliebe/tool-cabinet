// export type elSelectRemotePropsType = {}

export type elSelectRemotePropsType = {
    model: string | number | boolean | object | undefined
    remoteMethod: Function | undefined
    // show?: boolean
    // } & Record<string, any>
}

export type elSelectRemoteSlots = {}

export const elSelectRemoteProps = {
    model: {
        type: [String, Boolean, Object, undefined] as PropType<
            string | boolean | object | undefined
        >,
        default: undefined
    },
    remote: {
        type: Boolean,
        default: true
    },
    remoteMethod: {
        type: Function as PropType<Function>,
        default: () => {}
    },
    optionsProps: {
        type: Object,
        default: {
            id: 'key',
            label: 'label',
            value: 'value'
        }
    }

    // show: {
    //     type: Boolean as PropType<boolean | undefined>,
    //     default: undefined
    // }
}

// interface Props {
//     params: Record<string, any>
//     pageSize: number
//     fetchFun: () => void
//     updateValue: number | boolean | object | string | Array<any> | undefined
// }

// export type SelectProps = ExtractPublicPropTypes<typeof selectProps>
