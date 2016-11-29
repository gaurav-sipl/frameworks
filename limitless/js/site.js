/* ------------------------------------------------------------------------------
*
*  # Template JS core
*
*  Core JS file with default functionality configuration
*
*  Version: 1.2
*  Latest update: Dec 11, 2015
*
* ---------------------------------------------------------------------------- */

// Allow CSS transitions when page is loaded
$(window).on('load', function () {
    $('body').removeClass('no-transitions');
});


$(function () {

    // Disable CSS transitions on page load
    $('body').addClass('no-transitions');



    // ========================================
    //
    // Content area height
    //
    // ========================================


    // Calculate min height
    function containerHeight() {
        var availableHeight = $(window).height() - $('.page-container').offset().top - $('.navbar-fixed-bottom').outerHeight();

        $('.page-container').attr('style', 'min-height:' + availableHeight + 'px');
    }

    // Initialize
    containerHeight();




    // ========================================
    //
    // Heading elements
    //
    // ========================================


    // Heading elements toggler
    // -------------------------

    // Add control button toggler to page and panel headers if have heading elements
    $('.panel-heading, .page-header-content, .panel-body, .panel-footer').has('> .heading-elements').append('<a class="heading-elements-toggle"><i class="icon-more"></i></a>');


    // Toggle visible state of heading elements
    $('.heading-elements-toggle').on('click', function () {
        $(this).parent().children('.heading-elements').toggleClass('visible');
    });



    // Breadcrumb elements toggler
    // -------------------------

    // Add control button toggler to breadcrumbs if has elements
    $('.breadcrumb-line').has('.breadcrumb-elements').append('<a class="breadcrumb-elements-toggle"><i class="icon-menu-open"></i></a>');


    // Toggle visible state of breadcrumb elements
    $('.breadcrumb-elements-toggle').on('click', function () {
        $(this).parent().children('.breadcrumb-elements').toggleClass('visible');
    });




    // ========================================
    //
    // Navbar
    //
    // ========================================


    // Navbar navigation
    // -------------------------

    // Prevent dropdown from closing on click
    $(document).on('click', '.dropdown-content', function (e) {
        e.stopPropagation();
    });

    // Disabled links
    $('.navbar-nav .disabled a').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    // Show tabs inside dropdowns
    $('.dropdown-content a[data-toggle="tab"]').on('click', function (e) {
        $(this).tab('show');
    });




    // ========================================
    //
    // Element controls
    //
    // ========================================

    // Collapse elements
    // -------------------------

    //
    // Sidebar categories
    //

    // Hide if collapsed by default
    $('.category-collapsed').children('.category-content').hide();


    // Rotate icon if collapsed by default
    $('.category-collapsed').find('[data-action=collapse]').addClass('rotate-180');


    // Collapse on click
    $('.category-title [data-action=collapse]').click(function (e) {
        e.preventDefault();
        var $categoryCollapse = $(this).parent().parent().parent().nextAll();
        $(this).parents('.category-title').toggleClass('category-collapsed');
        $(this).toggleClass('rotate-180');

        containerHeight(); // adjust page height

        $categoryCollapse.slideToggle(150);
    });


    // ========================================
    //
    // Main navigation
    //
    // ========================================


    // Main navigation
    // -------------------------

    // Add 'active' class to parent list item in all levels
    $('.navigation').find('li.active').parents('li').addClass('active');

    // Hide all nested lists
    $('.navigation').find('li').not('.active, .category-title').has('ul').children('ul').addClass('hidden-ul');

    // Highlight children links
    $('.navigation').find('li').has('ul').children('a').addClass('has-ul');

    // Add active state to all dropdown parent levels
    $('.dropdown-menu:not(.dropdown-content), .dropdown-menu:not(.dropdown-content) .dropdown-submenu').has('li.active').addClass('active').parents('.navbar-nav .dropdown:not(.language-switch), .navbar-nav .dropup:not(.language-switch)').addClass('active');



    // Main navigation tooltips positioning
    // -------------------------

    // Left sidebar
    $('.navigation-main > .navigation-header > i').tooltip({
        placement: 'right',
        container: 'body'
    });



    // Collapsible functionality
    // -------------------------

    // Main navigation
    $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
        e.preventDefault();

        // Collapsible
        $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);

        // Accordion
        if ($('.navigation-main').hasClass('navigation-accordion')) {
            $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250);
        }
    });


    // Alternate navigation
    $('.navigation-alt').find('li').has('ul').children('a').on('click', function (e) {
        e.preventDefault();

        // Collapsible
        $(this).parent('li').not('.disabled').toggleClass('active').children('ul').slideToggle(200);

        // Accordion
        if ($('.navigation-alt').hasClass('navigation-accordion')) {
            $(this).parent('li').not('.disabled').siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(200);
        }
    });




    // ========================================
    //
    // Sidebars
    //
    // ========================================


    // Mini sidebar
    // -------------------------

    // Toggle mini sidebar
    $('.sidebar-main-toggle').on('click', function (e) {
        e.preventDefault();

        // Toggle min sidebar class
        $('body').toggleClass('sidebar-xs');
    });



    // Sidebar controls
    // -------------------------

    // Disable click in disabled navigation items
    $(document).on('click', '.navigation .disabled a', function (e) {
        e.preventDefault();
    });


    // Adjust page height on sidebar control button click
    $(document).on('click', '.sidebar-control', function (e) {
        containerHeight();
    });


    // Hide main sidebar in Dual Sidebar
    $(document).on('click', '.sidebar-main-hide', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-main-hidden');
    });


    // Toggle second sidebar in Dual Sidebar
    $(document).on('click', '.sidebar-secondary-hide', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-secondary-hidden');
    });


    // Hide all sidebars
    $(document).on('click', '.sidebar-all-hide', function (e) {
        e.preventDefault();

        $('body').toggleClass('sidebar-all-hidden');
    });



    //
    // Opposite sidebar
    //

    // Collapse main sidebar if opposite sidebar is visible
    $(document).on('click', '.sidebar-opposite-toggle', function (e) {
        e.preventDefault();

        // Opposite sidebar visibility
        $('body').toggleClass('sidebar-opposite-visible');

        // If visible
        if ($('body').hasClass('sidebar-opposite-visible')) {

            // Make main sidebar mini
            $('body').addClass('sidebar-xs');

            // Hide children lists
            $('.navigation-main').children('li').children('ul').css('display', '');
        }
        else {

            // Make main sidebar default
            $('body').removeClass('sidebar-xs');
        }
    });


    // Hide main sidebar if opposite sidebar is shown
    $(document).on('click', '.sidebar-opposite-main-hide', function (e) {
        e.preventDefault();

        // Opposite sidebar visibility
        $('body').toggleClass('sidebar-opposite-visible');

        // If visible
        if ($('body').hasClass('sidebar-opposite-visible')) {

            // Hide main sidebar
            $('body').addClass('sidebar-main-hidden');
        }
        else {

            // Show main sidebar
            $('body').removeClass('sidebar-main-hidden');
        }
    });


    // Hide secondary sidebar if opposite sidebar is shown
    $(document).on('click', '.sidebar-opposite-secondary-hide', function (e) {
        e.preventDefault();

        // Opposite sidebar visibility
        $('body').toggleClass('sidebar-opposite-visible');

        // If visible
        if ($('body').hasClass('sidebar-opposite-visible')) {

            // Hide secondary
            $('body').addClass('sidebar-secondary-hidden');

        }
        else {

            // Show secondary
            $('body').removeClass('sidebar-secondary-hidden');
        }
    });


    // Hide all sidebars if opposite sidebar is shown
    $(document).on('click', '.sidebar-opposite-hide', function (e) {
        e.preventDefault();

        // Toggle sidebars visibility
        $('body').toggleClass('sidebar-all-hidden');

        // If hidden
        if ($('body').hasClass('sidebar-all-hidden')) {

            // Show opposite
            $('body').addClass('sidebar-opposite-visible');

            // Hide children lists
            $('.navigation-main').children('li').children('ul').css('display', '');
        }
        else {

            // Hide opposite
            $('body').removeClass('sidebar-opposite-visible');
        }
    });


    // Keep the width of the main sidebar if opposite sidebar is visible
    $(document).on('click', '.sidebar-opposite-fix', function (e) {
        e.preventDefault();

        // Toggle opposite sidebar visibility
        $('body').toggleClass('sidebar-opposite-visible');
    });



    // Mobile sidebar controls
    // -------------------------

    // Toggle main sidebar
    $('.sidebar-mobile-main-toggle').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-mobile-main').removeClass('sidebar-mobile-secondary sidebar-mobile-opposite');
    });


    // Toggle secondary sidebar
    $('.sidebar-mobile-secondary-toggle').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-mobile-secondary').removeClass('sidebar-mobile-main sidebar-mobile-opposite');
    });


    // Toggle opposite sidebar
    $('.sidebar-mobile-opposite-toggle').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-mobile-opposite').removeClass('sidebar-mobile-main sidebar-mobile-secondary');
    });



    // Mobile sidebar setup
    // -------------------------

    $(window).on('resize', function () {
        setTimeout(function () {
            containerHeight();

            if ($(window).width() <= 768) {

                // Add mini sidebar indicator
                $('body').addClass('sidebar-xs-indicator');

                // Place right sidebar before content
                $('.sidebar-opposite').prependTo('.page-content');
            }
            else {

                // Remove mini sidebar indicator
                $('body').removeClass('sidebar-xs-indicator');

                // Revert back right sidebar
                $('.sidebar-opposite').insertAfter('.content-wrapper');

                // Remove all mobile sidebar classes
                $('body').removeClass('sidebar-mobile-main sidebar-mobile-secondary sidebar-mobile-opposite');
            }
        }, 100);
    }).resize();




    // ========================================
    //
    // Other code
    //
    // ========================================


    // Plugins
    // -------------------------

    // Popover
    $('[data-popup="popover"]').popover();


    // Tooltip
    $('[data-popup="tooltip"]').tooltip();


    // Checkboxes/radios (Uniform)
    // ------------------------------

    // if (jQuery(".styled, .multiselect-container input").size() > 0) {
    //     // Default initialization
    //     $(".styled, .multiselect-container input").uniform({
    //         radioClass: 'choice'
    //     });
    // }
    // File input
    // if (jQuery(".file-styled").size() > 0) {
    //     $(".file-styled").uniform({
    //         fileButtonClass: 'action btn bg-blue',
    //         fileButtonHtml: '<i class="icon-file-plus"></i> Choose File'
    //     });
    // }
    // Basic select
    // Override defaults
    if (jQuery(".selectpicker").size() > 0) {
        $.fn.selectpicker.defaults = {
            iconBase: '',
            tickIcon: 'icon-checkmark3'
        }
        $('.selectpicker').selectpicker();
    }

    //DatePicker 
    if (jQuery(".datepicker").size() > 0) {
        jQuery('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,         
            todayHighlight: true,
            clearBtn: true
        }).on('change', function () {
            
        });
    }

    //Accordian
    function initAccordion() {
        var oAccordion = jQuery('.accordion_container');
        if (oAccordion.size() > 0) {
            var menu_ul = jQuery('.accordion_container > li > div.accordion_content'), menu_a = jQuery('.accordion_container > li > a.anchor'), default_open_slide = jQuery('.accordion_container > li > div.default_open_slide');
            menu_ul.hide();
            default_open_slide.show();
            menu_a.click(function (e) {
                e.preventDefault();
                if (!jQuery(this).hasClass('active')) {
                    menu_a.removeClass('active');
                    menu_ul.filter(':visible').slideUp('normal');
                    jQuery(this).addClass('active').next().stop(true, true).slideDown('normal');
                } else {
                    jQuery(this).removeClass('active');
                    jQuery(this).next().stop(true, true).slideUp('normal');
                }
            });
        }
    }
    initAccordion();
});
var SITEForms = {
    onlyInteger: function () {
        jQuery('.only-integer').keypress(function (event) {
            var charCode = (event.which) ? event.which : event.keyCode;
            //if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 37 && charCode != 39 && charCode != 46) {
            if ((charCode < 48 || charCode > 57) && charCode != 8 && charCode != 46 && charCode != 9 && charCode != 37 && charCode != 39) {
                return false;
            }
            return true;
        });
    },
    onlyDigit: function () {
        jQuery('.only-digit').keypress(function (event) {
            var charCode = (event.which) ? event.which : event.keyCode;            
            if ((charCode < 48 || charCode > 57) && charCode != 8 && charCode != 9 && charCode != 46 && charCode != 37 && charCode != 39) {
                return false;
            }
            return true;
        });
    },
    onlyFloat: function () {
        jQuery('.only-float').keypress(function (event) {
            var charCode = (event.which) ? event.which : event.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 59) && charCode != 37 && charCode != 39 && charCode != 46) {
                return false;
            } // prevent if not number/dot

            if (charCode == 46 && $(this).val().indexOf('.') != -1) {
                return false;
            } // prevent if already dot
            return true;
        });
    },
    onlyAlphaDigit: function () {
        jQuery('.only-alpha-digit').keypress(function (event) {
            var charCode = (event.which) ? event.which : event.keyCode;
            if (charCode == 37 || charCode == 43 || charCode == 60 || charCode == 62 || charCode == 63 || charCode == 91 || charCode == 91 || charCode == 125 || charCode == 123 || charCode == 92 || charCode == 64 || charCode == 126 || charCode == 33 || charCode == 35 || charCode == 36 || charCode == 94 || charCode == 38 || charCode == 42 || charCode == 47) {
                return false;
            } // prevent if not number/dot
            return true;
        });
    },
   
    onlyAlphaDigit_1: function () {
        jQuery('.only-alpha-digit_1').keypress(function (event) {
            var charCode = (event.which) ? event.which : event.keyCode;
            if (charCode == 40 || charCode == 37 || charCode == 16 || charCode == 43 || charCode == 60 || charCode == 62 || charCode == 63 || charCode == 91 || charCode == 91 || charCode == 125 || charCode == 123 || charCode == 92 || charCode == 64 || charCode == 126 || charCode == 33 || charCode == 35 || charCode == 36 || charCode == 94 || charCode == 38 || charCode == 42 || charCode == 47) {
                return false;
            } // prevent if not number/dot
            return true;
        });
    },
    email: function () {
        jQuery('.email').keypress(function (event) {
            var charCode = (event.which) ? event.which : event.keyCode;
            if (charCode == 43 || charCode == 60 || charCode == 61 || charCode == 124 || charCode == 58 || charCode == 34 || charCode == 39 || charCode == 59 || charCode == 62 || charCode == 40 || charCode == 41 || charCode == 37 || charCode == 63 || charCode == 91 || charCode == 91 || charCode == 125 || charCode == 123 || charCode == 92 || charCode == 126 || charCode == 33 || charCode == 35 || charCode == 36 || charCode == 94 || charCode == 38 || charCode == 42 || charCode == 47) {
                return false;
            } // prevent if not number/dot

            if (charCode == 46 && $(this).val().indexOf('.') != -1) {
                //return false;
            } // prevent if already dot
            return true;
        });
    },
    onlyDecimalDigit: function () {
        jQuery('.only-alpha-decimal-digit_1').keypress(function (event) {
            var charCode = (event.which) ? event.which : event.keyCode;
            if (charCode != 46 && charCode > 31 
              
              && (charCode < 48 || charCode > 57))
              
                return false;

            return true;
        });
    }




}

//http://www.asquare.net/javascript/tests/KeyCode.html

$(window).on('load', function () {
	if (jQuery('.i-checks').size() > 0) {
		function tslChecks(){
			jQuery('.i-checks').iCheck({
				checkboxClass: 'icheckbox_square-green',
				radioClass: 'iradio_square-green',
				increaseArea: '10%' // optional
			});	
		}
		tslChecks();
	}
	
	if (jQuery('.only-float').size() > 0) {
    	SITEForms.onlyFloat();
	}

	if (jQuery('.only-integer').size() > 0) {
		SITEForms.onlyInteger();
	}
	
	if (jQuery('.only-digit').size() > 0) {
	    SITEForms.onlyDigit();
	}

	if (jQuery('.tsl-phone').size() > 0) {
		$(".tsl-phone").mask("9999999999");
	}
	
	if (jQuery('.tsl-zip-code').size() > 0) {
		$(".tsl-zip-code").mask("999999");
	}
	
	if (jQuery('.only-alpha-digit').size() > 0) {
	    SITEForms.onlyAlphaDigit();
	}

	if (jQuery('.only-alpha-digit_1').size() > 0) {
	    SITEForms.onlyAlphaDigit_1();
	}

	if (jQuery('.email').size() > 0) {
	    SITEForms.email();
	}
	if (jQuery('.only-alpha-digit_1').size() > 0) {
	    SITEForms.onlyAlphaDigit_1();
	}
	
	if (jQuery('.only-alpha-decimal-digit_1').size() > 0) {
	    SITEForms.onlyDecimalDigit();
	}



	if (jQuery('.file-styled').size() > 0) {
		$(document).on('change', '.file-styled:file', function() {
		var input = $(this),
			numFiles = input.get(0).files ? input.get(0).files.length : 1,
			label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
			input.trigger('fileselect', [numFiles, label]);
			
		var fileName = numFiles > 1 ? numFiles + ' files selected' : label;
		
			input.parents('.input-group').find(':text').val(fileName);
			
			console.log(fileName)
		});
	}

   
});

//Custom Notifications Box
function initNotifications(N_type, N_alert, N_alert_title) {
    var HTML = '<div class="tsl-notif ' + N_type + '"><a class="tsl-notif-close">×</a><div class="noti-header">' + N_alert_title + '</div><div class="jGrowl-message">' + N_alert + '</div></div>'
    jQuery('#tsl_notifications').html(HTML).fadeIn(100);
    setTimeout(function () { $("#tsl_notifications").hide(); }, 2000);
}

//Custom Conformation Box yes or no
function initConformation(CYF, CNF, CText, C_Title, CparentId ) {
    var HTML = '<div class="tsl-Conf"><div class="conf-header">' + C_Title + '</div><div class="conf-message">' + CText + '</div><div class="conf-action clearfix"><a onclick="'+ CNF +'" class="Conf-close pull-left btn btn-default">NO</a><a onclick="'+ CYF +'" class="Conf-close pull-right btn btn-primary">Yes</a></div></div>'
    jQuery(CparentId).addClass('Conf-open');
    jQuery(CparentId).append(HTML).fadeIn(500);

    jQuery('.Conf-close').on("click", function () {
        jQuery(this).closest(".tsl-Conf").fadeOut(0);
        jQuery(CparentId).removeClass('Conf-open');
    });
}




$(document).on("click", function (event) {
    $(event.target).closest(".tsl-notif").fadeOut(500);
    //$(event.target).closest(".Conf-close").fadeOut(500);
    $('.selectpicker.parsley-error').closest(".btn-default").fadeOut(500);

});

