import { supabase } from "@supabase/auth-ui-react/dist/esm/common/theming";

async function getProfile() {
	try {
		setLoading(true);

		let { data, error, status } = await supabase
			.from("profiles")
			.select(`username, instagram, avatar_url, full_name`)
			.eq("id", user.id)
			.single();

		if (error && status !== 406) {
			throw error;
		}

		if (data) {
			setUsername(data.username);
			setInstagram(data.instagram);
			setAvatarUrl(data.avatar_url);
			setFullName(data.full_name);
		}
	} catch (error) {
		console.log(error);
		alert("Error loading user data!");
	} finally {
		setLoading(false);
	}
}
