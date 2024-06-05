var bcSfFilterSettings={general:{limit:bcSfFilterConfig.custom.products_per_page,loadProductFirst:!1},template:{loadMoreLoading:'<div id="bc-sf-filter-load-more-loading"><div class="load-more__icon" style="width: 44px; height: 44px; opacity: 1;"></div></div>'}},bcSfFilterTemplate={saleLabelHtml:'<div class="sale_banner thumbnail_banner">'+bcSfFilterConfig.label.sale+"</div>",newLabelHtml:'<div class="new_banner thumbnail_banner">'+bcSfFilterConfig.label.new+"</div>",preorderLabelHtml:'<div class="new_banner thumbnail_banner">'+bcSfFilterConfig.label.pre_order+"</div>",quickViewBtnHtml:'<span data-fancybox-href="#product-{{itemId}}" class="quick_shop ss-icon" data-gallery="product-{{itemId}}-gallery">&#x002B;</span>',newRowHtml:'<br class="clear product_clear" />',productGridItemHtml:'<div class="mycustomcollectionparent" ><div class="{{itemColumnNumberClass}} {{itemCollectionGroupThumbClass}} thumbnail {{itemCollectionGroupSmallClass}}" itemprop="itemListElement" itemscope itemtype="http://schema.org/Product""><div class="product-wrap"><div class="relative product_image swap-'+bcSfFilterConfig.custom.secondary_image+'">{{itemWishlist}}<a href="{{itemUrl}}" itemprop="url">{{itemImages}}</a><div class="thumbnail-overlay"><a href="{{itemUrl}}" itemprop="url" class="hidden-product-link">{{itemTitle}}</a><div class="info">{{itemProductInfoHover}}</div></div><div class="banner_holder">{{itemSaleLabel}}{{itemNewLabel}}{{itemPreorderLabel}}</div></div><a class="product-info__caption {{itemHiddenClass}}" href="{{itemUrl}}" itemprop="url">{{itemExclusiveLabel}}{{itemTagsLabel}}{{itemProductInfo}}</a>{{itemColorSwatches}}</div></div>{{itemNewRow}}</div>',previousHtml:'<span class="prev"><a href="{{itemUrl}}">\xAB '+bcSfFilterConfig.label.paginate_prev+"</a></span>",nextHtml:'<span class="next"><a href="{{itemUrl}}">'+bcSfFilterConfig.label.paginate_next+" \xBB</a></span>",pageItemHtml:'<span class="page"><a href="{{itemUrl}}">{{itemTitle}}</a></span>',pageItemSelectedHtml:'<span class="page current">{{itemTitle}}</span>',pageItemRemainHtml:"<span>{{itemTitle}}</span>",paginateHtml:"{{previous}}{{pageItems}}{{next}}",sortingHtml:"{{sortingItems}}"};BCSfFilter.prototype.buildProductGridItem=function(data,index){var images=data.images_info,soldOut=!data.available,onSale=data.compare_at_price_min>data.price_min,priceVaries=data.price_min!=data.price_max,firstVariant=data.variants[0];if(getParam("variant")!==null&&getParam("variant")!=""){var paramVariant=data.variants.filter(function(e){return e.id==getParam("variant")});typeof paramVariant[0]!="undefined"&&(firstVariant=paramVariant[0])}else for(var i=0;i<data.variants.length;i++)if(data.variants[i].available){firstVariant=data.variants[i];break}var itemHtml=bcSfFilterTemplate.productGridItemHtml,onSaleClass=onSale?"sale":"",soldOutClass=soldOut?"out_of_stock":"in_stock",availabilityProp=soldOut?"http://schema.org/SoldOut":"http://schema.org/InStock",itemColumnNumberClass="",itemCollectionGroupThumbClass=buildItemCollectionGroupThumbClass(index,bcSfFilterConfig.custom.products_per_row),itemCollectionGroupLargeClass="",itemCollectionGroupMediumClass="",itemCollectionGroupSmallClass=(index-1)%2==0?"even":"odd";switch(bcSfFilterConfig.custom.products_per_row){case 2:itemColumnNumberClass="eight columns";break;case 3:itemColumnNumberClass="one-third column";break;case 4:itemColumnNumberClass="four columns";break;case 5:itemColumnNumberClass="one-fifth column";break;case 6:itemColumnNumberClass="one-sixth column";break;default:itemColumnNumberClass="one-seventh column";break}bcSfFilterConfig.custom.mobile_products_per_row==1?itemColumnNumberClass+=" medium-down--one-half small-down--one-whole":itemColumnNumberClass+=" medium-down--one-half small-down--one-half",itemHtml=itemHtml.replace(/{{itemColumnNumberClass}}/g,itemColumnNumberClass),itemHtml=itemHtml.replace(/{{itemCollectionGroupThumbClass}}/g,itemCollectionGroupThumbClass),itemHtml=itemHtml.replace(/{{itemCollectionGroupLargeClass}}/g,itemCollectionGroupLargeClass),itemHtml=itemHtml.replace(/{{itemCollectionGroupMediumClass}}/g,itemCollectionGroupMediumClass),itemHtml=itemHtml.replace(/{{itemCollectionGroupSmallClass}}/g,itemCollectionGroupSmallClass);var itemSoldOutLabel=soldOut?bcSfFilterTemplate.soldOutLabelHtml:"";itemHtml=itemHtml.replace(/{{itemSoldOutLabel}}/g,itemSoldOutLabel);var itemSaleLabel=bcSfFilterConfig.custom.sale_banner_enabled&&onSale?bcSfFilterTemplate.saleLabelHtml:"";itemHtml=itemHtml.replace(/{{itemSaleLabel}}/g,itemSaleLabel);var newLabel=data.collections.filter(function(e){return e.handle=="new"}),preorderLabel=data.collections.filter(function(e){return e.handle=="pre-order"}),comingsoonLabel=data.collections.filter(function(e){return e.handle=="coming-soon"});if(data.collections){var itemNewLabelHtml=typeof newLabel[0]!="undefined"?bcSfFilterTemplate.newLabelHtml:"";itemHtml=itemHtml.replace(/{{itemNewLabel}}/g,itemNewLabelHtml);var itemComingsoonLabelHtml=typeof comingsoonLabel[0]!="undefined"?bcSfFilterTemplate.comingsoonLabelHtml:"";itemHtml=itemHtml.replace(/{{itemComingsoonLabel}}/g,itemComingsoonLabelHtml);var itemPreorderLabelHtml=typeof preorderLabel[0]!="undefined"?bcSfFilterTemplate.preorderLabelHtml:"";itemHtml=itemHtml.replace(/{{itemPreorderLabel}}/g,itemPreorderLabelHtml)}var itemHiddenClass=bcSfFilterConfig.custom.thumbnail_hover_enabled?"hidden":"";itemHtml=itemHtml.replace(/{{itemHiddenClass}}/g,itemHiddenClass);var itemImageSrc='data-src="'+this.getFeaturedImage(images,"900x")+'" ';itemImageSrc+='data-srcset=" '+this.getFeaturedImage(images,"300x")+" 300w,",itemImageSrc+=this.getFeaturedImage(images,"400x")+" 400w,",itemImageSrc+=this.getFeaturedImage(images,"500x")+" 500w,",itemImageSrc+=this.getFeaturedImage(images,"600x")+" 600w,",itemImageSrc+=this.getFeaturedImage(images,"700x")+" 700w,",itemImageSrc+=this.getFeaturedImage(images,"800x")+" 800w,",itemImageSrc+=this.getFeaturedImage(images,"900x")+' 900w"';var itemThumbUrl=this.getFeaturedImage(images,"100x"),itemFlipImageUrl=images.length>1?this.optimizeImage(images[1].src):this.getFeaturedImage(images,"900x"),product_set_width=data.featured_image.width,align_height_value="";if(bcSfFilterConfig.custom.align_height&&images.length>0){var collection_height=bcSfFilterConfig.custom.collection_height,product_aspect_ratio=images[0].width/images[0].height;product_set_width=product_aspect_ratio*collection_height,images[0].width>=images[0].height?align_height_value="width: 100%; height: auto;":align_height_value="width: 100%;"}var itemImagesHtml='<div class="image__container" style="max-width: '+product_set_width+'px;">';itemImagesHtml+='<img loading="lazy" src="'+itemThumbUrl+'" alt="{{itemTitle}}"  class="lazyload '+bcSfFilterConfig.custom.image_loading_style+'" style="'+align_height_value+" max-width: "+data.featured_image.width+'px;" data-sizes="auto" '+itemImageSrc+"/>",itemImagesHtml+="</div>",bcSfFilterConfig.custom.secondary_image&&(itemImagesHtml+='<div class="image__container" style="max-width:',images.length>1?itemImagesHtml+=images[1].width+'px">':itemImagesHtml+=data.featured_image.width+'px">',itemImagesHtml+='<img src="'+itemFlipImageUrl+'" class="secondary lazyload" alt="{{itemTitle}}" />',itemImagesHtml+="</div>"),itemHtml=itemHtml.replace(/{{itemImages}}/g,itemImagesHtml);var priceAttr=typeof comingsoonLabel=="undefined"?bcSfFilterConfig.label.coming_soon:this.formatMoney(firstVariant.money),fullDescAttr=data.description!==null?'data-full-description="'+this.escape(data.description.split("<!-- split -->")[0])+'"':"data-full-description",regularDescAttr=data.description!==null?'data-regular-description="'+this.escape(this.truncateByWord(data.description,bcSfFilterConfig.custom.description_words).replace("Description","").replace("Dimensions","").replace("Details","").replace("Specs","").replace("Shipping","").replace("Size",""))+'"':"data-regular-description",imageAttr="";for(var k in images)imageAttr+=images[k].id+" || "+data.title+" ||";var colHandleAttr="";for(var k in data.collections)colHandleAttr+=data.collections[k].handle,k<data.collections.length-1&&(colHandleAttr+=",");imageAttr=imageAttr.replace(/"/g,"&#34;");var itemProductInfoHoverHtml="";bcSfFilterConfig.custom.thumbnail_hover_enabled&&bcSfFilterConfig.custom.quick_shop_enabled||bcSfFilterConfig.custom.thumbnail_hover_enabled?itemProductInfoHoverHtml+="{{itemProductInfo}}":bcSfFilterConfig.custom.quick_shop_enabled,itemHtml=itemHtml.replace(/{{itemProductInfoHover}}/g,itemProductInfoHoverHtml);var itemProductInfoHtml='<div class="product-details">';itemProductInfoHtml+='<span class="title" itemprop="name">{{itemTitle}}</span>',itemProductInfoHtml+="{{itemReview}}",itemProductInfoHtml+="{{itemVendor}}",itemProductInfoHtml+="{{itemPrice}}",itemProductInfoHtml+="{{percentageOff}}",itemProductInfoHtml+="</div>",itemHtml=itemHtml.replace(/{{itemProductInfo}}/g,itemProductInfoHtml);var itemReviewHtml="";bcSfFilterConfig.custom.enable_shopify_review_comments&&bcSfFilterConfig.custom.enable_shopify_collection_badges&&(itemReviewHtml='<span class="shopify-product-reviews-badge" data-id="{{itemId}}"></span>'),itemHtml=itemHtml.replace(/{{itemReview}}/g,itemReviewHtml);var itemVendorHtml="";bcSfFilterConfig.custom.vendor_enable&&(itemVendorHtml='<span itemprop="brand" class="brand">'+data.vendor+"</span>"),itemHtml=itemHtml.replace(/{{itemVendor}}/g,itemVendorHtml);var itemPriceHtml="",customPriceMin=data.price_min,customPriceCompared=data.compare_at_price_max;if(typeof comingsoonLabel[0]!="undefined")itemPriceHtml+='<span class="modal_price">'+bcSfFilterConfig.label.coming_soon+"</span>";else{if(itemPriceHtml+='<span class="price '+onSaleClass+'" itemprop="offers" itemscope itemtype="http://schema.org/Offer">',itemPriceHtml+='<meta itemprop="price" content="'+this.formatMoney(customPriceMin)+'" />',itemPriceHtml+='<meta itemprop="priceCurrency" content="'+bcSfFilterConfig.shop.currency+'" />',itemPriceHtml+='<meta itemprop="seller" content="'+bcSfFilterConfig.shop.name+'" />',itemPriceHtml+='<meta itemprop="availability" content="'+availabilityProp+'" />',itemPriceHtml+='<meta itemprop="itemCondition" content="http://schema.org/NewCondition" />',priceVaries&&data.price_min>0&&(itemPriceHtml+="<small><em>"+bcSfFilterConfig.label.from_price+"</em></small> "),data.price_min>0?data.tags.includes("Best Deals")||bcSfFilterConfig.general.collection_handle==="best-deals-1"?(itemPriceHtml+='<span class="money pfs-special-price">\u20B9'+this.formatMoney(customPriceMin*.9)+"</span>",itemPriceHtml+='<span class="money pfs-cross-regular-price">\u20B9'+this.formatMoney(customPriceMin)+"</span>"):itemPriceHtml+='<span class="money">\u20B9'+this.formatMoney(customPriceMin)+"</span>":itemPriceHtml+=bcSfFilterConfig.label.free_price,soldOut&&(itemPriceHtml+='<span class="sold_out">'+bcSfFilterConfig.label.sold_out+"</span>"),onSale)if(priceVaries&&data.price_min>0){var variant=data.variants.find(function(e){return e.price==customPriceMin});typeof variant!="undefined"&&(customPriceCompared=variant.compare_at_price),data.tags.includes("Best Deals")||bcSfFilterConfig.general.collection_handle==="best-deals-1"?itemPriceHtml+=' <span class="was_price pfs-margin-none"><span class="money">\u20B9'+this.formatMoney(customPriceCompared)+"</span></span>":itemPriceHtml+=' <span class="was_price"><span class="money">\u20B9'+this.formatMoney(customPriceCompared)+"</span></span>"}else data.tags.includes("Best Deals")||bcSfFilterConfig.general.collection_handle==="best-deals-1"?itemPriceHtml+=' <span class="was_price pfs-margin-none"><span class="money">\u20B9'+this.formatMoney(customPriceCompared)+"</span></span>":itemPriceHtml+=' <span class="was_price"><span class="money">\u20B9'+this.formatMoney(customPriceCompared)+"</span></span>";itemPriceHtml+="</span>"}itemHtml=itemHtml.replace(/{{itemPrice}}/g,itemPriceHtml);var percentageOff="";onSale&&(percentageOff+='<span class="savings">'+data.percent_sale_min+"% off</span>"),itemHtml=itemHtml.replace(/{{percentageOff}}/g,percentageOff);var itemColorSwatchesHtml="";if(console.log(data.title),bcSfFilterConfig.custom.collection_swatches)for(var k in data.options){var option=data.options[k],downcasedOption=option.toLowerCase(),colorTypes=["color","colour","farve"];if(colorTypes.indexOf(downcasedOption)>-1){var option_index=k,values=[];itemColorSwatchesHtml+='<div class="collection_swatches mycustomvariantswatches">';for(var i in data.variants){var variant=data.variants[i],variantStatus="";variant.available||(variantStatus="oos");var value=variant.options[option_index];if(values.indexOf(value)==-1){var values=values.join(",");values+=","+value,values=values.split(",");var fileColorUrl=this.optimizeImage(bcSfFilterConfig.general.no_image_url,"50x");variant.image!==null&&(fileColorUrl=this.optimizeImage(variant.image,"50x")),itemColorSwatchesHtml+='<a href="'+this.buildProductItemUrl(data)+"?variant="+variant.id+'" class="swatch '+variantStatus+'" data-swatch-name="meta-'+downcasedOption+"_"+value.replace(/\s/g,"_").toLowerCase()+'">',itemColorSwatchesHtml+="<span ",bcSfFilterConfig.custom.products_per_row==2?itemColorSwatchesHtml+='data-image="'+this.optimizeImage(variant.image,"600x")+'" ':bcSfFilterConfig.custom.products_per_row==2?itemColorSwatchesHtml+='data-image="'+this.optimizeImage(variant.image,"500x")+'" ':itemColorSwatchesHtml+='data-image="'+this.optimizeImage(variant.image,"400x")+'" ',itemColorSwatchesHtml+='style="background-image: url('+fileColorUrl+"); background-color: "+this.slugify(value.split(" ").pop())+';">',itemColorSwatchesHtml+="</span>",itemColorSwatchesHtml+="</a>"}}itemColorSwatchesHtml+="</div>"}}itemHtml=itemHtml.replace(/{{itemColorSwatches}}/g,itemColorSwatchesHtml);var itemNewRowHtml=index%bcSfFilterConfig.custom.products_per_row==0?bcSfFilterTemplate.newRowHtml:"";itemHtml=itemHtml.replace(/{{itemNewRow}}/g,itemNewRowHtml);var itemWishListHtml='<a class="iWishAddColl iwishcheck" data-variant="'+firstVariant.id+'" data-product="{{itemId}}" data-ptitle="{{itemTitle}}">';return itemWishListHtml+='<!--?xml version="1.0" ?--><svg fill="none" class="icon" height="24" width="24" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',itemWishListHtml+="  </a>",itemHtml=itemHtml.replace(/{{itemWishlist}}/g,itemWishListHtml),itemHtml=itemHtml.replace(/{{itemExclusiveLabel}}/g,buildExclusiveLabel(data)),itemHtml=itemHtml.replace(/{{itemTagsLabel}}/g,buildTagsLabel(data)),itemHtml=itemHtml.replace(/{{itemId}}/g,data.id),itemHtml=itemHtml.replace(/{{itemHandle}}/g,data.handle),itemHtml=itemHtml.replace(/{{itemTitle}}/g,data.title),itemHtml=itemHtml.replace(/{{itemUrl}}/g,this.buildProductItemUrl(data,!1)),itemHtml};function buildExclusiveLabel(data){var exclusiveLabel="";return data.tags.includes("pfs:label-Online Exclusive")&&(exclusiveLabel='<span class="boost-exclusive">ONLINE EXCLUSIVE</span>'),exclusiveLabel}function buildTagsLabel(data){var customLabels="";return data.tags.includes("pfs:label-Best-Seller")&&(customLabels='<span class="boost-best-seller">BEST SELLER</span>'),data.tags.includes("pfs:label-New-Launch")&&(customLabels='<span class="boost-new-launch">NEW LAUNCH</span>'),data.tags.includes("pfs:label-Best-Deals")&&(customLabels='<span class="boost-best-deals">BEST DEALS</span>'),data.tags.includes("pfs:label-Freedom-Special")&&(customLabels='<span class="boost-freedom-special">FREEDOM SPECIAL</span>'),data.tags.includes("pfs:label-Flash-Deal")&&(customLabels='<span class="boost-flash-deal"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.8914 13.6798L7.81786 12.8562L14.4267 5.40339L13.109 10.321L16.1825 11.1445L9.57369 18.5974L10.8914 13.6798Z" fill="#FFA133"/></svg><span class="flash_txt">FLASH DEAL</span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.8914 13.6798L7.81786 12.8562L14.4267 5.40339L13.109 10.321L16.1825 11.1445L9.57369 18.5974L10.8914 13.6798Z" fill="#FFA133"/></svg></span>'),console.log("TAGGS",data.tags),customLabels}function buildItemCollectionGroupThumbClass(index,productsPerRow){var temp=index<productsPerRow?index:index%productsPerRow;return temp==0?"omega":temp==1?"alpha":""}BCSfFilter.prototype.buildPagination=function(totalProduct){var currentPage=parseInt(this.queryParams.page),totalPage=Math.ceil(totalProduct/this.queryParams.limit);if(totalPage==1)return jQ(this.selector.pagination).html(""),!1;if(this.getSettingValue("general.paginationType")=="default"){var paginationHtml=bcSfFilterTemplate.paginateHtml,previousHtml=currentPage>1?bcSfFilterTemplate.previousHtml:"";previousHtml=previousHtml.replace(/{{itemUrl}}/g,this.buildToolbarLink("page",currentPage,currentPage-1)),paginationHtml=paginationHtml.replace(/{{previous}}/g,previousHtml);var nextHtml=currentPage<totalPage?bcSfFilterTemplate.nextHtml:"";nextHtml=nextHtml.replace(/{{itemUrl}}/g,this.buildToolbarLink("page",currentPage,currentPage+1)),paginationHtml=paginationHtml.replace(/{{next}}/g,nextHtml);for(var beforeCurrentPageArr=[],iBefore=currentPage-1;iBefore>currentPage-3&&iBefore>0;iBefore--)beforeCurrentPageArr.unshift(iBefore);currentPage-4>0&&beforeCurrentPageArr.unshift("..."),currentPage-4>=0&&beforeCurrentPageArr.unshift(1),beforeCurrentPageArr.push(currentPage);for(var afterCurrentPageArr=[],iAfter=currentPage+1;iAfter<currentPage+3&&iAfter<=totalPage;iAfter++)afterCurrentPageArr.push(iAfter);currentPage+3<totalPage&&afterCurrentPageArr.push("..."),currentPage+3<=totalPage&&afterCurrentPageArr.push(totalPage);for(var pageItemsHtml="",pageArr=beforeCurrentPageArr.concat(afterCurrentPageArr),iPage=0;iPage<pageArr.length;iPage++)pageArr[iPage]=="..."?pageItemsHtml+=bcSfFilterTemplate.pageItemRemainHtml:pageItemsHtml+=pageArr[iPage]==currentPage?bcSfFilterTemplate.pageItemSelectedHtml:bcSfFilterTemplate.pageItemHtml,pageItemsHtml=pageItemsHtml.replace(/{{itemTitle}}/g,pageArr[iPage]),pageItemsHtml=pageItemsHtml.replace(/{{itemUrl}}/g,this.buildToolbarLink("page",currentPage,pageArr[iPage]));paginationHtml=paginationHtml.replace(/{{pageItems}}/g,pageItemsHtml),jQ(this.selector.pagination).html(paginationHtml)}},BCSfFilter.prototype.buildFilterSorting=function(){if(bcSfFilterTemplate.hasOwnProperty("sortingHtml")){jQ(this.selector.topSorting).html("");var sortingArr=this.getSortingList();if(sortingArr){var sortingItemsHtml="";for(var k in sortingArr)sortingItemsHtml+='<option value="'+k+'">'+sortingArr[k]+"</option>";var html=bcSfFilterTemplate.sortingHtml.replace(/{{sortingItems}}/g,sortingItemsHtml);jQ(this.selector.topSorting).html(html),jQ(this.selector.topSorting).val(this.queryParams.sort)}}},BCSfFilter.prototype.buildSortingEvent=function(){var _this=this;jQ(this.selector.topSorting).change(function(e){onInteractWithToolbar(e,"sort",_this.queryParams.sort,jQ(this).val())})},BCSfFilter.prototype.buildBreadcrumb=function(colData,apiData){if(typeof colData!="undefined"&&colData.hasOwnProperty("collection")){var colInfo=colData.collection,breadcrumbHtml='<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a href="'+bcSfFilterConfig.shop.url+'" title="'+bcSfFilterConfig.shop.name+'" itemprop="item" class="breadcrumb_link"><span itemprop="name">'+bcSfFilterConfig.label.breadcrumb_home+"</span></a></span> ";breadcrumbHtml+='<span class="breadcrumb-divider">/</span> <span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a href="{{currentCollectionLink}}" title="{{currentCollectionTitle}}" itemprop="item" class="breadcrumb_link"><span itemprop="name">{{currentCollectionTitle}}</span></a></span> ';var currentTagsHtml="";if(Array.isArray(bcSfFilterConfig.general.current_tags)){var current_tags=bcSfFilterConfig.general.current_tags;for(var k in current_tags){var tag=current_tags[k];currentTagsHtml+='<span class="breadcrumb-divider">/</span>',currentTagsHtml+='<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a href="/collections/{{currentCollectionLink}}/'+this.slugify(tag)+'" title="'+tag+'" itemprop="item"><span itemprop="name">'+tag+"</span></a></span>"}}breadcrumbHtml+=currentTagsHtml,breadcrumbHtml=breadcrumbHtml.replace(/{{currentCollectionLink}}/g,"/collections/"+colInfo.handle).replace(/{{currentCollectionTitle}}/g,colInfo.title),breadcrumbHtml+=' <span id="bc-sf-filter-top-pagination"></span>',jQ(".breadcrumb_text").html(breadcrumbHtml)}},BCSfFilter.prototype.buildExtrasProductList=function(data){var self=this;bcSfFilterConfig.custom.quick_shop_enabled&&jQ(self.getSelector("products")).find(".product_image").each(function(e){var _this=jQ(this);if(jQ(_this).find("div.info").find(".quick_shop").length==0){var url=jQ(_this).find(" > a").eq(0).attr("href");jQ.ajax({type:"GET",url:url+"?view=bc-sf-quickview",success:function(data2){jQ(_this).find("div.info").append(data2)}})}})},BCSfFilter.prototype.buildAdditionalElements=function(data){var self=this;jQ(self.getSelector("filterTree")).find("a").attr("data-no-instant",""),jQ(self.getSelector("filterTreeHorizontal")).find("a").attr("data-no-instant",""),jQ(self.getSelector("products")).children().hasClass("product-list")&&jQ(self.getSelector("products")).children().children().unwrap();var totalPage=Math.ceil(data.total_product/this.queryParams.limit),topPaginationHtml='<span class="breadcrumb-divider">/</span> '+bcSfFilterConfig.label.breadcrumb_page.replace(/{{ current_page }}/g,this.queryParams.page).replace(/{{ pages }}/g,totalPage);if(jQ("#bc-sf-filter-top-pagination").html(topPaginationHtml),data.total_product==1)var productCount="(".concat(data.total_product," Product)");else var productCount="(".concat(data.total_product," Products)");jQ(".bc-sf-filter-product-count").html(productCount),bcSfFilterConfig.custom.show_multiple_currencies&&window.convertCurrencies&&typeof convertCurrencies=="function"&&convertCurrencies(),typeof iwishCheckColl=="function"&&iwishCheckColl(),jQuery(".iWishAddColl").click(function(e){e.stopImmediatePropagation();var iWishvId=jQuery(this).attr("data-variant");return jQuery(this).hasClass("iwishAdded")?(iwish_addCollection(jQuery(this),iWishvId),jQuery(this).removeClass("iwishAdded")):iwish_addCollection(jQuery(this),iWishvId),iWishCounter(),!1})},BCSfFilter.prototype.buildDefaultElements=function(){var isiOS=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,isSafari=/Safari/.test(navigator.userAgent),isBackButton=window.performance&&window.performance.navigation&&window.performance.navigation.type==2;if(!(isiOS&&isSafari&&isBackButton)){var self=this,url=window.location.href.split("?")[0],searchQuery=self.isSearchPage()&&self.queryParams.hasOwnProperty("q")?"&q="+self.queryParams.q:"";window.location.replace(url+"?view=bc-original"+searchQuery)}};function customizeJsonProductData(data){for(var i=0;i<data.variants.length;i++){var variant=data.variants[i],featureImage=data.images.filter(function(e){return e.src==variant.image});featureImage.length>0?variant.featured_image={id:featureImage[0].id,product_id:data.id,position:featureImage[0].position,created_at:"",updated_at:"",alt:null,width:featureImage[0].width,height:featureImage[0].height,src:featureImage[0].src,variant_ids:[variant.id]}:variant.featured_image=""}var self=bcsffilter,itemJson={id:data.id,title:data.title,handle:data.handle,vendor:data.vendor,variants:data.variants,url:self.buildProductItemUrl(data),options_with_values:data.options_with_values,images:data.images,images_info:data.images_info,available:data.available,price_min:data.price_min,price_max:data.price_max,compare_at_price_min:data.compare_at_price_min,compare_at_price_max:data.compare_at_price_max};return itemJson}BCSfFilter.prototype.prepareProductData=function(data){for(var countData=data.length,k=0;k<countData;k++){data[k].images=data[k].images_info,data[k].images.length>0?data[k].featured_image=data[k].images[0]:data[k].featured_image={src:bcSfFilterConfig.general.no_image_url,width:"",height:"",aspect_ratio:0},data[k].url="/products/"+data[k].handle;for(var optionsArr=[],countOptionsWithValues=data[k].options_with_values.length,i=0;i<countOptionsWithValues;i++)optionsArr.push(data[k].options_with_values[i].name);if(data[k].options=optionsArr,typeof bcSfFilterConfig.general.currencies!="undefined"&&bcSfFilterConfig.general.currencies.length>1){var updateMultiCurrencyPrice2=function(oldPrice,newPrice){return typeof newPrice!="undefined"?newPrice:oldPrice},updateMultiCurrencyPrice=updateMultiCurrencyPrice2,currentCurrency=bcSfFilterConfig.general.current_currency.toLowerCase().trim();data[k].price_min=updateMultiCurrencyPrice2(data[k].price_min,data[k]["price_min_"+currentCurrency]),data[k].price_max=updateMultiCurrencyPrice2(data[k].price_max,data[k]["price_max_"+currentCurrency]),data[k].compare_at_price_min=updateMultiCurrencyPrice2(data[k].compare_at_price_min,data[k]["compare_at_price_min_"+currentCurrency]),data[k].compare_at_price_max=updateMultiCurrencyPrice2(data[k].compare_at_price_max,data[k]["compare_at_price_max_"+currentCurrency])}data[k].price_min*=100,data[k].price_max*=100,data[k].compare_at_price_min*=100,data[k].compare_at_price_max*=100,data[k].price=data[k].price_min,data[k].compare_at_price=data[k].compare_at_price_min,data[k].price_varies=data[k].price_min!=data[k].price_max;var firstVariant=data[k].variants[0];if(getParam("variant")!==null&&getParam("variant")!=""){var paramVariant=data[k].variants.filter(function(e){return e.id==getParam("variant")});typeof paramVariant[0]!="undefined"&&(firstVariant=paramVariant[0])}else for(var countVariants=data[k].variants.length,i=0;i<countVariants;i++)if(data[k].variants[i].available){firstVariant=data[k].variants[i];break}data[k].selected_or_first_available_variant=firstVariant;for(var countVariants=data[k].variants.length,i=0;i<countVariants;i++){var variantOptionArr=[],count=1,variant=data[k].variants[i],variantOptions=variant.merged_options;if(Array.isArray(variantOptions)){for(var countVariantOptions=variantOptions.length,j=0;j<countVariantOptions;j++){var temp=variantOptions[j].split(":");data[k].variants[i]["option"+(parseInt(j)+1)]=temp[1],data[k].variants[i]["option_"+temp[0]]=temp[1],variantOptionArr.push(temp[1])}data[k].variants[i].options=variantOptionArr}data[k].variants[i].compare_at_price=parseFloat(data[k].variants[i].compare_at_price)*100,data[k].variants[i].price=parseFloat(data[k].variants[i].price)*100}data[k].description=data[k].content=data[k].body_html,data[k].hasOwnProperty("original_tags")&&data[k].original_tags.length>0&&(data[k].tags=data[k].original_tags.slice(0)),data[k].json=customizeJsonProductData(data[k])}return data};function getFilePath(fileName,ext,version){var self=bcsffilter,ext=typeof ext!="undefined"?ext:"png",version=typeof version!="undefined"?version:"1",prIndex=self.fileUrl.lastIndexOf("?");if(prIndex>0)var filePath=self.fileUrl.substring(0,prIndex);else var filePath=self.fileUrl;return filePath+=fileName+"."+ext+"?v="+version,filePath}BCSfFilter.prototype.getFilterData=function(eventType,errorCount){function BCSend(eventType2,errorCount2){var self=bcsffilter,errorCount2=typeof errorCount2!="undefined"?errorCount2:0;self.showLoading(),typeof self.buildPlaceholderProductList=="function"&&self.buildPlaceholderProductList(eventType2),self.beforeGetFilterData(eventType2),self.prepareRequestParams(eventType2),self.queryParams.callback="BCSfFilterCallback",self.queryParams.event_type=eventType2;var url=self.isSearchPage()?self.getApiUrl("search"):self.getApiUrl("filter"),script=document.createElement("script");script.type="text/javascript";var timestamp=new Date().getTime();script.src=url+"?t="+timestamp+"&"+jQ.param(self.queryParams),script.id="bc-sf-filter-script",script.async=!0;var resendAPITimer,resendAPIDuration;resendAPIDuration=2e3,script.addEventListener("error",function(e){typeof document.getElementById(script.id).remove=="function"?document.getElementById(script.id).remove():document.getElementById(script.id).outerHTML="",errorCount2<3?(errorCount2++,resendAPITimer&&clearTimeout(resendAPITimer),resendAPITimer=setTimeout(self.getFilterData("resend",errorCount2),resendAPIDuration)):self.buildDefaultElements(eventType2)}),document.getElementsByTagName("head")[0].appendChild(script),script.onload=function(){typeof document.getElementById(script.id).remove=="function"?document.getElementById(script.id).remove():document.getElementById(script.id).outerHTML=""}}this.requestFilter(BCSend,eventType,errorCount)},BCSfFilter.prototype.requestFilter=function(sendFunc,eventType,errorCount){sendFunc(eventType,errorCount)},BCSfFilter.prototype.initFilter=function(){return this.isBadUrl()?void(window.location.href=window.location.pathname):(this.updateApiParams(!1),void this.getFilterData("init"))},BCSfFilter.prototype.isBadUrl=function(){try{var t=decodeURIComponent(window.location.search).split("&"),e=!1;if(t.length>0)for(var i=0;i<t.length;i++){var n=t[i],a=(n.match(/</g)||[]).length,r=(n.match(/>/g)||[]).length,o=(n.match(/alert\(/g)||[]).length,h=(n.match(/execCommand/g)||[]).length;if(a>0&&r>0||a>1||r>1||o||h){e=!0;break}}return e}catch(l){return!0}};
//# sourceMappingURL=/cdn/shop/t/685/assets/bc-sf-filter.js.map?v=80093875366232204941716546242