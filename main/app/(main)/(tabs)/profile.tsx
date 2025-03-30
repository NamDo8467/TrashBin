import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ImageBackground } from "react-native"
import { supabase } from "../../../services/supabase"
import { router } from "expo-router"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useEffect, useState } from "react"

export default function ProfileScreen() {
	const [fullName, setFullName] = useState("")
	const [userEmail, setUserEmail] = useState("")
	const [lastSignInAt, setLastSignInAt] = useState("")
	const [createdAt, setCreatedAt] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	const convertToDate = (date: string) => {
		// console.log(typeof date)
		const d = Date.parse(date)

		const formatted_date = new Date(d)
		// const year =
		const year = formatted_date.getFullYear()
		let month = formatted_date.getMonth() + 1
		if (month < 10) {
			month = "0" + month
		}
		const date_ = formatted_date.getDate()

		let hour = formatted_date.getHours()
		if (hour < 10) {
			hour = "0" + hour
		}
		let minute = formatted_date.getMinutes()
		if (minute < 10) {
			minute = "0" + minute
		}
		const res = year + "-" + month + "-" + date_ + " " + hour + ":" + minute
		return res
	}
	useEffect(() => {
		;(async () => {
			const {
				data: { user }
			} = await supabase.auth.getUser()
			// console.log(user)
			// console.log(user?.email)
			setFullName(user?.email || "abc@gmail.com")
			setUserEmail(user?.email || "abc@gmail.com")
			setLastSignInAt(convertToDate(user?.last_sign_in_at) || "Unknown")
			setCreatedAt(convertToDate(user?.created_at) || "Unknown")
			setPhoneNumber(user?.phone || "")
			// console.log()
		})()
	}, [])
	const handleSignOut = async () => {
		await supabase.auth.signOut()
		router.replace("/(auth)/login")
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Profile</Text>
			<View style={{ flex: 1, width: "100%", justifyContent: "flex-start", alignItems: "center" }}>
				{/* For user picture */}
				<View
					style={{
						flex: 0.55,
						// borderWidth: 2,
						// borderColor: "red",
						// backgroundImage: "../../../assets/images/user_profile.png"
						borderRadius: "50%",
						backgroundColor: "#7676764f",
						width: "80%",
						height: 100
					}}
				>
					<ImageBackground
						source={{ uri: "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png" }}
						resizeMode='cover'
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							width: "85%",
							height: "85%",
							marginLeft: 37,
							marginTop: 10
						}}
					></ImageBackground>
				</View>

				{/* For Full name section */}
				<View
					style={{
						flex: 0.1,
						justifyContent: "flex-start",
						alignItems: "stretch",
						width: "100%",
						paddingHorizontal: 5,
						marginBottom: 10
						// borderWidth: 2,
						// borderColor: "red",
						// borderRadius: 10,
					}}
				>
					<Text style={{ marginBottom: 5 }}>Full Name</Text>

					<TextInput editable={false} style={styles.textInput}>
						<FontAwesome name='user' />
						<Text style={{ marginLeft: 100 }}> {fullName}</Text>
					</TextInput>
				</View>

				{/* For Email section */}
				<View
					style={{
						flex: 0.1,
						justifyContent: "flex-start",
						width: "100%",
						paddingHorizontal: 5,
						marginBottom: 10
						// borderWidth: 2,
						// borderColor: "red",
						// // borderRadius: 10,
					}}
				>
					<Text style={{ marginBottom: 5 }}>Email</Text>

					<TextInput editable={false} style={styles.textInput}>
						<FontAwesome name='envelope' />
						<Text style={{ marginLeft: 100 }}> {userEmail}</Text>
					</TextInput>
				</View>

				{/* For Phone Number section */}
				<View
					style={{
						flex: 0.1,
						justifyContent: "flex-start",
						width: "100%",
						// borderWidth: 2,
						// borderColor: "red",
						// borderRadius: 10,
						paddingHorizontal: 5,
						marginBottom: 10
					}}
				>
					<Text style={{ marginBottom: 5 }}>Phone Number</Text>
					<TextInput editable={false} style={styles.textInput}>
						<FontAwesome name='phone' />
						<Text style={{ marginLeft: 100 }}> {phoneNumber}</Text>
					</TextInput>
				</View>

				{/* For last_sign_in_at and created_at */}
				<View style={{ width: "100%", marginTop: 10, flex: 0.1 }}>
					<Text style={{ fontStyle: "italic", textAlign: "left", marginLeft: 5 }}>Created at: {createdAt}</Text>
					<Text style={{ fontStyle: "italic", textAlign: "left", marginLeft: 5 }}>Last sign in at: {lastSignInAt}</Text>
				</View>
			</View>
			<TouchableOpacity style={styles.button} onPress={handleSignOut}>
				<Text style={styles.buttonText}>Sign Out</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
		height: "50%",
		width: "100%"
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20
	},
	button: {
		backgroundColor: "#ff4444",
		padding: 15,
		borderRadius: 8,
		width: "100%",
		alignItems: "center"
		// borderWidth:2,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold"
	},
	textInput: {
		backgroundColor: "#7676764f",
		borderRadius: 8,
		padding: 5,
		flex: 1,
		alignItems: "center"
	}
})
