router.get('/:id', async (req, res) => {
    try {
        const listingId = req.params.id;


        // Assuming you have a method like 'findByPk' on your Listing model
        const foundListing = await Listing.findByPk(listingId);

        if (!foundListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        const currentUser = req.session.user_id;
        console.log(currentUser);

        // Send the image buffer along with other listing details
        res.status(200).json({
            listing: {
                id: foundListing.id,
                title: foundListing.title,
                price: foundListing.price,
                description: foundListing.description,
                date_created: foundListing.date_created,
                game_name: foundListing.game_name,
                console_name: foundListing.console_name,
                console_brand: foundListing.console_brand,
                year: foundListing.year,
                condition: foundListing.condition,
                color: foundListing.color,
                is_special_edition: foundListing.is_special_edition,
                category_id: foundListing.category_id,
                user_id: foundListing.user_id,
                image: foundListing.image ? foundListing.image.toString('base64') : null,
                currentUser
            }
        });
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
});