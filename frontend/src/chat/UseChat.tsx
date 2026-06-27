import { useContext } from "react";
import { ChatContext } from "./ChatContext";

export default function UseChat() {
	const ctx = useContext(ChatContext);
	if (!ctx) {
		throw new Error("UseChat must be used inside ChatProvider");
	}
	return ctx;
}