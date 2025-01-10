import { HeaderMegaMenu } from "./HeaderMega";

export default function Header({ openAuth,safeLogout }) {
	return (
		<div>
			<header>
				<HeaderMegaMenu openAuth={openAuth} safeLogout ={safeLogout}/>
			</header>
		</div>
	);
}
