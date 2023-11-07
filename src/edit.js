import { 
	InnerBlocks, 
	useBlockProps, 
	BlockControls,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { 
	ToolbarButton, 
	Button, 
	ToolbarGroup,
	ToolbarDropdownMenu,
	RangeControl, 
	SelectControl,
	MenuGroup, 
	MenuItem,
} from '@wordpress/components';
import './editor.scss';
import { 
	lock, 
	search,
	unlock,
	sidesLeft, 
	sidesAxial, 
	sidesRight, 
	sidesTop, 
	sidesBottom,
	chevronUp, 
	lineSolid,
	chevronDown,
	aspectRatio as aspectRatioIcon,
	resizeCornerNE,
	link, 
	linkOff
} from '@wordpress/icons';

const TEMPLATE = [
    [
        'core/group', {"layout":{"type":"constrained"}},
        [
            ['core/post-title', {}]
        ]
    ]
];

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { 
		blockHeight, 
		blockHeightUnit, 
		backgroundAttachment,
		flexJustify,
		backgroundPosition,
		page,
		postId,
		aspectRatio,
		blockWidth,
		blockWidthUnit,
	} = attributes;

	const toggleBackgroundAttachment = () => {
		const value = backgroundAttachment === 'fixed' ? 'scroll' : 'fixed';
		setAttributes({ backgroundAttachment: value });
	};

	const PositionIcon = () => {
		switch (backgroundPosition) {
			case 'left':
				return sidesLeft;
			case 'right':
				return sidesRight;
			case 'top':
				return sidesTop;
			case 'bottom':
				return sidesBottom;
			default:
				return sidesAxial;
		}
	};

	const FlexJustifyIcon = () => {
		switch (flexJustify) {
			case 'flex-start':
				return chevronUp;
			case 'flex-end':
				return chevronDown;
			default:
				return lineSolid;
		}
	};

	const handleLinkClick = (event) => {
		if (!event.ctrlKey) {
		  event.preventDefault();
		}
	};

	const toggleIsLink = () => {
		setAttributes({ isLink: !attributes.isLink });
	};
	
	const linkIcon = attributes.isLink ? link : linkOff;

	const wrapperStyles = {
		backgroundColor: 'grey',
		backgroundAttachment: backgroundAttachment,
		backgroundPosition: backgroundPosition,
	};

	if (blockHeight != null) {
		wrapperStyles.height = `${blockHeight}${blockHeightUnit}`;
	}

	if (blockWidth != null) {
		wrapperStyles.width = `${blockWidth}${blockWidthUnit}`;
	}

	if (aspectRatio != null) {
		wrapperStyles.aspectRatio = aspectRatio;
	}

	const blockProps = useBlockProps( {
		style: wrapperStyles,
	} );

	return (
		<div { ...blockProps }>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={linkIcon}
						label={attributes.isLink ? 'Is a link' : 'Not a link'}
						onClick={toggleIsLink}
						isActive={attributes.isLink}
					/>
					<ToolbarDropdownMenu
						icon="search"
						label="Link">
			        	{ ( { } ) => (
							<>
								<LinkControl
									searchInputPlaceholder="Search or enter URL..."
									value={page}
									onChange={(newPage) => {
										setAttributes({ page: null });
										if (newPage && newPage.id) {
											setAttributes({ postId: newPage.id });
										};
										setAttributes({ page: newPage });
									}}
									showInitialSuggestions={true}
									onRemove={() => {
										setAttributes({ page: null });
										setAttributes({ postId: null });
									}}
								/>
							</>
						) }
					</ToolbarDropdownMenu>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarDropdownMenu
						icon={aspectRatioIcon}
						label="Aspect Ratio">
			        	{ ( { } ) => (
							<>
								<MenuGroup label="Aspect Ratio">
									<MenuItem onClick={() => setAttributes({ aspectRatio: null })}>
										Not set
									</MenuItem>
									<MenuItem onClick={() => {
										if (blockHeight && blockWidth) {
											setAttributes({ blockWidth: null })
										}
										setAttributes({ aspectRatio: '21/9' })
										}}>
										21/9
									</MenuItem>
									<MenuItem onClick={() => {
										if (blockHeight && blockWidth) {
											setAttributes({ blockWidth: null })
										}
										setAttributes({ aspectRatio: '16/9' })
										}}>
										16/9
									</MenuItem>
									<MenuItem onClick={() => {
										if (blockHeight && blockWidth) {
											setAttributes({ blockWidth: null })
										}
										setAttributes({ aspectRatio: '16/10' })
										}}>
										16/10
									</MenuItem>
									<MenuItem onClick={() => {
										if (blockHeight && blockWidth) {
											setAttributes({ blockWidth: null })
										}
										setAttributes({ aspectRatio: '3/2' })
										}}>
										3/2
									</MenuItem>
									<MenuItem onClick={() => {
										if (blockHeight && blockWidth) {
											setAttributes({ blockWidth: null })
										}
										setAttributes({ aspectRatio: '4/3' })
										}}>
										4/3
									</MenuItem>
									<MenuItem onClick={() => {
										if (blockHeight && blockWidth) {
											setAttributes({ blockWidth: null })
										}
										setAttributes({ aspectRatio: '5/4' })
										}}>
										5/4
									</MenuItem>
									<MenuItem onClick={() => {
										if (blockHeight && blockWidth) {
											setAttributes({ blockWidth: null })
										}
										setAttributes({ aspectRatio: '1/1' })
										}}>
										1/1
									</MenuItem>
									<MenuItem onClick={() => {
										if (blockHeight && blockWidth) {
											setAttributes({ blockWidth: null })
										}
										setAttributes({ aspectRatio: '4/5' })
										}}>
										4/5
									</MenuItem>
									<MenuItem onClick={() => {
										if (blockHeight && blockWidth) {
											setAttributes({ blockWidth: null })
										}
										setAttributes({ aspectRatio: '3/4' })
										}}>
										3/4
									</MenuItem>
									<MenuItem onClick={() => {
										if (blockHeight && blockWidth) {
											setAttributes({ blockWidth: null })
										}
										setAttributes({ aspectRatio: '2/3' })
										}}>
										2/3
									</MenuItem>
									<MenuItem onClick={() => {
										if (blockHeight && blockWidth) {
											setAttributes({ blockWidth: null })
										}
										setAttributes({ aspectRatio: '9/16' })
										}}>
										9/16
									</MenuItem>
								</MenuGroup>
							</>
						) }
					</ToolbarDropdownMenu>
					<ToolbarDropdownMenu
						icon={ resizeCornerNE }
						label="Size"
						popoverProps={{className:'willsides-sizecontrol-popover'}}>
							 { ( {} ) => (
							<>
								<MenuGroup label="Height">
								<div className='willsides-popover-flexrow'>
									<div className='willsides-range'>
										<RangeControl
											value={blockHeight}
											onChange={(value) =>
												setAttributes({
													blockHeight: parseInt(value, 10),
												})
											}
											min={1}
											max={1000}
										/>
									</div>
									<div className='willsides-select'>
										<SelectControl
											value={blockHeightUnit}
											options={[
												{ label: 'px', value: 'px' },
												{ label: 'vh', value: 'vh' },
												{ label: 'em', value: 'em' },
												{ label: 'rem', value: 'rem' },
												{ label: '%', value: '%' },
											]}
											onChange={(value) =>
												setAttributes({
													blockHeightUnit: value,
												})
											}
										/>
									</div>
									<div className='willsides-button'>
										<Button
											isSmall
											onClick={() => setAttributes({ blockHeight: null })}
										>
											Unset
										</Button>
									</div>
								</div>
								</MenuGroup>
								<MenuGroup label="Width">
								<div className='willsides-popover-flexrow'>
									<div className='willsides-range'>
										<RangeControl
											value={blockWidth}
											onChange={(value) =>
												setAttributes({
													blockWidth: parseInt(value, 10),
												})
											}
											min={1}
											max={1000}
										/>
									</div>
									<div className='willsides-select'>
										<SelectControl
											value={blockWidthUnit}
											options={[
												{ label: 'px', value: 'px' },
												{ label: 'vw', value: 'vw' },
												{ label: 'em', value: 'em' },
												{ label: 'rem', value: 'rem' },
												{ label: '%', value: '%' },
											]}
											onChange={(value) =>
												setAttributes({
													blockWidthUnit: value,
												})
											}
										/>
									</div>
									<div className='willsides-button'>
										<Button
											isSmall
											onClick={() => setAttributes({ blockWidth: null })}
										>
											Unset
										</Button>
									</div>
								</div>
								</MenuGroup>
							</>
						) }
					</ToolbarDropdownMenu>
					<ToolbarDropdownMenu
						icon={<PositionIcon />}
						label="Background Position">
						{ ( {} ) => (
						<>
							<MenuGroup label="Background Position">
								<MenuItem
									icon={sidesTop}
									onClick={() => setAttributes({ backgroundPosition: 'top' })}
								>
									Top
								</MenuItem>
								<MenuItem
									icon={sidesAxial}
									onClick={() => setAttributes({ backgroundPosition: 'center' })}
								>
									Center
								</MenuItem>
								<MenuItem
									icon={sidesBottom}
									onClick={() => setAttributes({ backgroundPosition: 'bottom' })}
								>
									Bottom
								</MenuItem>
								<MenuItem
									icon={sidesLeft}
									onClick={() => setAttributes({ backgroundPosition: 'left' })}
								>
									Left
								</MenuItem>
								<MenuItem
									icon={sidesRight}
									onClick={() => setAttributes({ backgroundPosition: 'right' })}
								>
									Right
								</MenuItem>
							</MenuGroup>
							</>
						) }
					</ToolbarDropdownMenu>
					<ToolbarButton
						icon={ backgroundAttachment === 'fixed' ? lock : unlock }
						label={ backgroundAttachment === 'fixed' ? 'Background Fixed' : 'Background Scroll' }
						onClick={ toggleBackgroundAttachment }
						className={ backgroundAttachment === 'fixed' ? 'is-pressed' : '' }
					/>
					<ToolbarDropdownMenu
						icon={<FlexJustifyIcon />}
						label="Vertical Alignment">
						{ ( {} ) => (
						<>	
							<MenuGroup label="Vertical Alignment">
								<MenuItem
									icon={chevronUp}
									onClick={() => setAttributes({ flexJustify: 'flex-start' })}
								>
									Top
								</MenuItem>
								<MenuItem
									icon={lineSolid}
									onClick={() => setAttributes({ flexJustify: 'center' })}
								>
									Middle
								</MenuItem>
								<MenuItem
									icon={chevronDown}
									onClick={() => setAttributes({ flexJustify: 'flex-end' })}
								>
									Bottom
								</MenuItem>
							</MenuGroup>
							</>
						) }
					</ToolbarDropdownMenu>
				</ToolbarGroup>
			</BlockControls>
			{page && page.url ? (
				<a 
					href={page.url} 
					style={{ justifyContent: `${flexJustify}`}}
					title={`Ctrl+Click to follow link`}
					onClick={handleLinkClick}
					target={ page.openInNewTab ? "_blank" : "_self" } 
					rel={ page.openInNewTab ? "noopener noreferrer" : "noopener" }
					className='willsides-overlay'
				>
					<InnerBlocks
					orientation="vertical"
					template={TEMPLATE}
					/>
				</a>
				) : (
				<div 
					className='willsides-overlay'
					style={{ justifyContent: `${flexJustify}`}}
				>
					<InnerBlocks
						orientation="vertical"
						template={TEMPLATE}
					/>
				</div>
				)}
		</div>
	);
}
