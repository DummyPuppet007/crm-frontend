import { message as antdMessage, Button } from "antd";

export default function Message({
    type,
    message,
}: {
    type: "success" | "info" | "warning" | "error";
    message: string;
}) {
    const [messageApi, contextHolder] = antdMessage.useMessage();

    switch (type) {
        case "success":
            messageApi.success(message);
            break;
        case "info":
            messageApi.info(message);
            break;
        case "warning":
            messageApi.warning(message);
            break;
        case "error":
            messageApi.error(message);
            break;
    }

    return (
        <>
            {contextHolder}
            <Button onClick={() => messageApi.success("This should be visible!")}>
                Test Message
            </Button>
        </>
    )
}
