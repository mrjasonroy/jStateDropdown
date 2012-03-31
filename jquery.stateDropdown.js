(function($) {
	var _options = {};

	var methods = {
		init: function(options) {
			return this.each(function() {
				if (options) {
					_options = $.extend($.fn.stateSelectBox.defaults, options);
				} else {
					_options = $.fn.stateSelectBox.defaults;
				}
				var $this = $(this);
				var data = $this.data('stateList');

				if (!data) {
					$(this).data('stateList', {
						options: _options,
						target: $this
					});
					if(_options.reorderUsFirst) {
						methods.reorderUs($this);
					}
					$(this).change(methods.countrySelect);
					$('option:contains("' + _options.initialCountry + '")', $this).first().attr('selected', 'selected');
					$(this).change();
				}
			});
		},
		reorderUs: function(element) {
			$(element).find('option:contains(' + element.data('stateList').options.usIdentifier + '):first').insertAfter($(element).find('option:eq(0)'));
			$(element).val(0);
		},
		countrySelect: function(event){
			var $element = $(event.currentTarget);
			if($element.find('option:selected').text() == $element.data('stateList').options.usIdentifier) {
				methods.convertStateField($element);
			}
			else {
				methods.destroyStateSelect($element);
			}
		},
		convertStateField: function(element){
			var stateInput = $(element.data('stateList').options.stateInputElement);
			var selectHtml = element.data('stateList').selectHtml;
			if( !selectHtml ) {
				stateInput.change(methods.updateStateInput);
				selectHtml = '<select name="' + element.attr('name') + '" class="stateSelect dropdownList ' + element.attr('class') + '">';
				selectHtml += '<option value>Select</option>';
				$.each(element.data('stateList').options.stateList, function(i, node){
					selectHtml += '<option value="' + node.abbr +'">' + node.full + '</option>';
				});
				selectHtml += '</select>';
				element.data('stateList').selectHtml = selectHtml;
				stateInput.after(selectHtml);
				var stateSelect = element.data('stateList').stateSelect = $(stateInput).siblings('.stateSelect');
				stateSelect.data('stateList', { 'stateInput' : stateInput });
				stateSelect.change(methods.updateStateInput);
			}
			else {
				element.data('stateList').stateSelect.show();
			}
			stateInput.hide();
			
		},
		destroyStateSelect: function(element) {
			if(element.data('stateList').selectHtml) {
				element.data('stateList').stateSelect.hide();
				element.data('stateList').stateSelect.data('stateList').stateInput.show();
			}
		},
		updateStateInput: function(event){
			var stateSelect = $(event.currentTarget);
			var stateInput = stateSelect.data('stateList').stateInput;
			stateInput.val(stateSelect.val());
		}
	};
	$.fn.stateSelectBox = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} 
		else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} 
		else {
			$.error('Method ' + method + ' does not exist on jQuery.stateSelectBox');
		}
		return false;
	};
	$.fn.stateSelectBox.defaults = {
		stateList: [{
			full: 'Alabama',
			abbr: 'AL'
		},
		{
			full: 'Alaska',
			abbr: 'AK'
		},
		{
			full: 'Arizona',
			abbr: 'AZ'
		},
		{
			full: 'Arkansas',
			abbr: 'AR'
		},
		{
			full: 'California',
			abbr: 'CA'
		},
		{
			full: 'Colorado',
			abbr: 'CO'
		},
		{
			full: 'Connecticut',
			abbr: 'CT'
		},
		{
			full: 'Delaware',
			abbr: 'DE'
		},
		{
			full: 'Florida',
			abbr: 'FL'
		},
		{
			full: 'Georgia',
			abbr: 'GA'
		},
		{
			full: 'Hawaii',
			abbr: 'HI'
		},
		{
			full: 'Idaho',
			abbr: 'ID'
		},
		{
			full: 'Illinois',
			abbr: 'IL'
		},
		{
			full: 'Indiana',
			abbr: 'IN'
		},
		{
			full: 'Iowa',
			abbr: 'IA'
		},
		{
			full: 'Kansas',
			abbr: 'KS'
		},
		{
			full: 'Kentucky',
			abbr: 'KY'
		},
		{
			full: 'Louisiana',
			abbr: 'LA'
		},
		{
			full: 'Maine',
			abbr: 'ME'
		},
		{
			full: 'Maryland',
			abbr: 'MD'
		},
		{
			full: 'Massachusetts',
			abbr: 'MA'
		},
		{
			full: 'Michigan',
			abbr: 'MI'
		},
		{
			full: 'Minnesota',
			abbr: 'MN'
		},
		{
			full: 'Mississippi',
			abbr: 'MS'
		},
		{
			full: 'Missouri',
			abbr: 'MO'
		},
		{
			full: 'Montana',
			abbr: 'MT'
		},
		{
			full: 'Nebraska',
			abbr: 'NE'
		},
		{
			full: 'Nevada',
			abbr: 'NV'
		},
		{
			full: 'New Hampshire',
			abbr: 'NH'
		},
		{
			full: 'New Jersey',
			abbr: 'NJ'
		},
		{
			full: 'New Mexico',
			abbr: 'NM'
		},
		{
			full: 'New York',
			abbr: 'NY'
		},
		{
			full: 'North Carolina',
			abbr: 'NC'
		},
		{
			full: 'North Dakota',
			abbr: 'ND'
		},
		{
			full: 'Ohio',
			abbr: 'OH'
		},
		{
			full: 'Oklahoma',
			abbr: 'OK'
		},
		{
			full: 'Oregon',
			abbr: 'OR'
		},
		{
			full: 'Pennsylvania',
			abbr: 'PA'
		},
		{
			full: 'Rhode Island',
			abbr: 'RI'
		},
		{
			full: 'South Carolina',
			abbr: 'SC'
		},
		{
			full: 'South Dakota',
			abbr: 'SD'
		},
		{
			full: 'Tennessee',
			abbr: 'TN'
		},
		{
			full: 'Texas',
			abbr: 'TX'
		},
		{
			full: 'Utah',
			abbr: 'UT'
		},
		{
			full: 'Vermont',
			abbr: 'VT'
		},
		{
			full: 'Virginia',
			abbr: 'VA'
		},
		{
			full: 'Washington',
			abbr: 'WA'
		},
		{
			full: 'West Virginia',
			abbr: 'WV'
		},
		{
			full: 'Wisconsin',
			abbr: 'WI'
		},
		{
			full: 'Wyoming',
			abbr: 'WY'
		},
		{
			full: 'Guam',
			abbr: 'GU'
		},
		{
			full: 'Puerto Rico',
			abbr: 'PR'
		},
		{
			full: 'Armed Forces Africa',
			abbr: 'AE'
		},
		{
			full: 'Armed Forces Americas(except Canada)',
			abbr: 'AA'
		},
		{
			full: 'Armed Forces Canada',
			abbr: 'AE'
		},
		{
			full: 'Armed Forces Europe',
			abbr: 'AE'
		},
		{
			full: 'Armed Forces Middle East',
			abbr: 'AE'
		},
		{
			full: 'Armed Forces Pacific',
			abbr: 'AP'
		},
		{
			full: 'Army Post Office',
			abbr: 'APO'
		},
		{
			full: 'Fleet Post Office',
			abbr: 'FPO'
		}],
		stateInputElement: '.state',
		usIdentifier: 'United States',
		initialCountry: 'United States',
		reorderUsFirst: true
	};
})(jQuery);
