/**
 * Validates that a required field has a defined and non-null value.
 * Throws an error if the field is missing or its value is undefined or null.
 *
 * @function
 * @param {Object} data - The field data object to validate.
 * @param {string} data.fieldName - The name of the field being validated.
 * @param {string} data.value - The value of the field being validated.
 * @throws {Error} - Throws an error if the field's value is undefined or null, specifying the field name.
 * @returns {boolean} - Returns `true` if the field's value is defined and not null.
 */
exports.validateRequiredFields = ({ fieldName, value } = data) => {
	if (!value) {
		throw new Error(
			`All fields are required: ${fieldName} is undefined or null`
		)
	}
	return true
}

/**
 * Validates that a given field's value is a string containing only alphanumeric characters,
 * spaces, exclamation marks, or question marks. Throws an error if the field's value contains
 * non-alphanumeric characters or if it is not a string.
 *
 * @function
 * @param {Object} data - The field data object to validate.
 * @param {string} data.fieldName - The name of the field being validated.
 * @param {*} data.value - The value of the field being validated.
 * @throws {Error} - Throws an error if the field's value is not a string or contains invalid characters.
 * @returns {boolean} - Returns `true` if the field's value is a valid alphanumeric string.
 */
exports.isStringAlphanumeric = ({ fieldName, value } = data) => {
	console.log(fieldName)

	const isAlphanumeric = (str) => /^[a-zA-Z0-9\s!?]+$/.test(str)
	// title
	if (typeof value !== "string" || !isAlphanumeric(value)) {
		throw new Error(`${fieldName} must be a string with no weird characters !`)
	}
	return true
}

// Async function to check if email already exists
exports.checkEmailExists = async (email) => {
	try {
		const response = await fetch(
			`${process.env.USER_SERVICE_URI}?email=${email}`
		)
		const data = await response.json()
		//console.log(data)

		return data
	} catch (error) {
		console.error("Error:", error)
		throw new Error(error.message || "Failed to check email in the database")
	}
}

// Async function to check if email already exists
exports.checkUserIdExists = async (userId) => {
	try {
		const response = await fetch(`${process.env.USER_SERVICE_URI}/${userId}`)
		const ok = await response.ok

		return ok
	} catch (error) {
		console.error("Error:", error)
		throw new Error(error.message || "Failed to check email in the database")
	}
}
