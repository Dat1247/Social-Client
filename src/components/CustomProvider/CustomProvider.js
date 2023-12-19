import { ConfigProvider } from "antd"

export const CustomProvider = ({children}) => {
    return <ConfigProvider
            theme={{
                token: {
                    colorBgElevated: '#64748b',
                    colorText: 'white',
                    colorTextPlaceholder: 'white',
                    colorTextQuaternary: 'white',
                    colorBorder: 'transparent',
                },
                components: {
                    Select: {
                        selectorBg: '#475569',
                        optionSelectedBg: '#1e293b',
                        optionActiveBg:'#334155',
                    }
                }
            }}>
        {children}
    </ConfigProvider>
}