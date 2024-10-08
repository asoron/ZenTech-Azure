import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useUserPermissions from "../useUserPermissions";
import "./style/SideMenu.css";

const SideMenu = ({ onAIChange, selectedAI, userId }) => {
	const { permissions, isLoading } = useUserPermissions(userId);
	const [firstAvailableButton, setFirstAvailableButton] = useState("");

	const buttons = [
		{ name: "Napnite", roles: ["admin", "user"], visible: permissions.Napnite },
		{ name: "Lit", roles: ["editor", "user"], visible: permissions.Lit },
		{ name: "Accounter", roles: ["editor", "user"], visible: permissions.Accounter },
		{ name: "Influencer", roles: ["editor", "user"], visible: permissions.Influencer },
		{ name: "MarketingManager", roles: ["editor", "user"], visible: permissions.MarketingManager },
		{ name: "PT", roles: ["editor", "user"], visible: permissions.PT },
		{ name: "SLP", roles: ["editor", "user"], visible: permissions.SLP },
		{ name: "SocialManager", roles: ["editor", "user"], visible: permissions.SocialManager },
		{ name: "StartupLawyer", roles: ["editor", "user"], visible: permissions.StartupLawyer },
		{ name: "TechWriter", roles: ["editor", "user"], visible: permissions.TechWriter },
		{ name: "TezChatSetup", roles: ["editor", "user"], visible: permissions.TezChatSetup },
		{ name: "Normal", roles: ["editor", "user"], visible: permissions.Normal },
		// Add more buttons as needed
	];

	useEffect(() => {
		// Find the name of the first available button
		const firstButton = buttons.find((button) => button.visible)?.name || "";
		setFirstAvailableButton(firstButton);
	}, [buttons, permissions]);

	return (
		<div className="sideMenu">
			{isLoading ? (
				<div className="loadingContainer">Loading...</div>
			) : (
				buttons
					.filter((button) => button.visible)
					.map((button, index) => (
						<button
							key={index}
							className={`menuButton ${
								selectedAI === button.name ||
								(selectedAI === "" && button.name === firstAvailableButton)
									? "selected"
									: ""
							}`}
							onClick={() => onAIChange(button.name)}>
							{button.name}
						</button>
					))
			)}
		</div>
	);
};

SideMenu.propTypes = {
    onAIChange: PropTypes.func.isRequired,
    selectedAI: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
};

export default SideMenu;
