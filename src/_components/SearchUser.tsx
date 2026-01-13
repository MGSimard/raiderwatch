// Search for a user by their Embark ID or Platform ID
// Embark ID is the username#XXXX discriminator format
// Platform ID is the platform specific ID (Steam ID, Epic Games ID, etc.)

// List of current platforms supported for Arc Raiders and their identifier types:

// - STEAM: SteamID (Static, Unique), Username, Community Username

// STEAM:
// Static: SteamID
// Dynamic: Username, Community Username

// EMBARK:
// Dynamic: Embark ID (Username#XXXX)

// EPIC GAMES:
// Dynamic: Username

export function SearchUser() {
  return <div>SearchUser</div>;
}
