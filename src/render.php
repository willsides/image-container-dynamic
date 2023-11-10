<?php
// Store the original $post object
global $post;
$original_post = $post;

// Set up the new global $post object if required
if (isset($attributes['page']['id'])) {
    $post = get_post($attributes['page']['id']);
    setup_postdata($post);
}

// Prepare attributes
$background_image_url = esc_url(
    get_the_post_thumbnail_url(isset($attributes['page']['id']) ? $attributes['page']['id'] : null) // A null value passed to this function returns the current post's thumbnail url
);
$permalink = isset($attributes['page']['id']) ?
	esc_url(get_the_permalink($attributes['page']['id'])) :
	esc_url(isset($attributes['page']['url']) ?
		$attributes['page']['url'] : 
		get_the_permalink());
$aspect_ratio = isset($attributes['aspectRatio']) ? esc_attr($attributes['aspectRatio']) : null;
$background_attachment = isset($attributes['backgroundAttachment']) ? esc_attr($attributes['backgroundAttachment']) : null;
$background_position = isset($attributes['backgroundPosition']) ? esc_attr($attributes['backgroundPosition']) : null;
$block_height = isset($attributes['blockHeight']) ? esc_attr($attributes['blockHeight']) : null;
$block_width = isset($attributes['blockWidth']) ? esc_attr($attributes['blockWidth']) : null;
$height_unit = isset($attributes['blockHeightUnit']) ? esc_attr($attributes['blockHeightUnit']) : null;
$width_unit = isset($attributes['blockWidthUnit']) ? esc_attr($attributes['blockWidthUnit']) : null;
$link_opens_new_tab = isset($attributes['page']['openInNewTab']) && $attributes['page']['openInNewTab'];
$wrapperId = isset($attributes['wrapperId']) && $attributes['wrapperId'] ? esc_attr($attributes['wrapperId']) : null;

// Prepare inline CSS
$inline_styles = '';
$class_list = '';
$id_list = '';
if ($background_image_url) {
    $inline_styles .= sprintf('background-image:url(%s);', $background_image_url);
} else {
    $class_list .= 'ws-no-image';
}
if ($background_attachment) {
    $inline_styles .= sprintf('background-attachment:%s;', $background_attachment);
}
if ($background_position) {
    $inline_styles .= sprintf('background-position:%s;', $background_position);
}
if ($block_width !== null) {
    $inline_styles .= sprintf('width:%s%s;', $block_width, $width_unit);
}
if ($block_height !== null) {
    $inline_styles .= sprintf('height:%s%s;', $block_height, $height_unit);
}
if ($aspect_ratio !== null) {
    $inline_styles .= sprintf('aspect-ratio:%s;', $aspect_ratio);
}
if ($wrapperId !== null) {
    $id_list .= $wrapperId;
}

// Get the wrapper attributes, including inline styles
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => $class_list,
    'style' => $inline_styles,
    'id' => $id_list
]);

// Prepare overlay element
$overlay_element = $attributes['isLink'] ? 'a' : 'div';

// Prepare overlay styles
$overlay_styles = sprintf('justify-content: %s', $attributes['flexJustify']);

// Prepare link properties
$props = $link_opens_new_tab ? 'target="_blank" rel="noopener noreferrer"' : 'target="_self" rel="noopener"';
$href_text = $attributes['isLink'] ? sprintf(' href="%s" %s', $permalink, $props) : '';

// Prepare content
$inner_content = isset($content) ? $content : '';
// Output block HTML
echo sprintf(
    '<div %1$s><%2$s%3$s style="%4$s" class="willsides-overlay">%5$s</%2$s></div>',
    $wrapper_attributes,
	$overlay_element,
	$href_text,
	$overlay_styles,
    $inner_content
);

$post = $original_post;
wp_reset_postdata();