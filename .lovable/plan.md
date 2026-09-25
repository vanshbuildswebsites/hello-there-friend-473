# Final V4 polish and AI room recommendations

## Changes
- Remove the invalid `exterior-01.jpg` placeholder file and keep the showroom section using only the existing real exterior photos.
- Replace the “The Idea” paragraph with the supplied wording and refine the existing collection captions without changing routes, imagery, hero, contact details, disclaimer, or visual direction.
- Add one editorial-style “Room recommendations” section where shoppers enter room type, dimensions, style, budget, and optional needs.
- Send the form securely through a server function to Lovable AI Gateway, then show only validated recommendations from the existing showroom collections and photo library.
- Include clear loading, retry, validation, and failure states; recommended photos link to the existing category pages.

## Technical details
- Use a validated `createServerFn` request so the AI credential remains server-side.
- Give the model a fixed catalog of available collections and photos, request structured JSON, and filter its response against that catalog before returning it to the page.
- Keep all styling within the current black, cream, gold, serif/sans editorial system and preserve mobile behavior.

## Verification
- Confirm the missing image is no longer requested, the existing category routes still work, and the AI form returns valid showroom-only recommendations.
- Check the finished page at mobile and desktop widths, including errors and horizontal overflow.
