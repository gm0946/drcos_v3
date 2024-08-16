$(document).ready(function () {
    WP_CORE({
        page: 'review',
    });

    // review search key selected
    const search_key = WP_CORE().util.getParamUrl('search_key');
    if (search_key) {
        $('#search_key option').each(function () {
            if ($(this).val() == search_key.trim()) {
                $(this).attr('selected', true);
            }
        });
    }
});