<?php

namespace Drupal\rts_migrations\Plugin\migrate\process;
use Drupal\migrate\Annotation\MigrateProcessPlugin;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use Exception;

/**
 * Perform a United States abbreviation to the state that is provided.
 *
 * @MigrateProcessPlugin(
 *     id = "get_state_abbreviation"
 * )
 *
 * To transform the state to an abbreviation, use:
 *
 * @code
 * field_text:
 *   plugin: get_state_abbreviation
 *   source: text
 * @endcode
 *
 */
class getStateAbbreviation extends ProcessPluginBase {

    /**
     * Implements MigrateRowInterface::prepareRow().
     * @param Row $row
     * @return void
     * @throws Exception
     */
    public function prepareRow(Row $row): void
    {
        $stateName = $row->getSourceProperty('field_headquarters_address_state');
        $stateAbbr = $this->getStateAbbreviation($stateName);
        $row->setSourceProperty('field_headquarters_address_state', $stateAbbr);
    }

    /*
     *
     */
    public function getStateAbbreviation($stateName): string
    {
        $abbr = array(
            'Alabama' => 'AL',
            'Alaska' => 'AK',
            'Arizona' => 'AZ',
            'Arkansas' => 'AR',
            'California' => 'CA',
            'Colorado' => 'CO',
            'Connecticut' => 'CT',
            'Delaware' => 'DE',
            'District of Columbia' => 'DC',
            'Florida' => 'FL',
            'Georgia' => 'GA',
            'Hawaii' => 'HI',
            'Idaho' => 'ID',
            'Illinois' => 'IL',
            'Indiana' => 'IN',
            'Iowa' => 'IA',
            'Kansas' => 'KS',
            'Kentucky' => 'KY',
            'Louisiana' => 'LA',
            'Maine' => 'ME',
            'Maryland' => 'MD',
            'Massachusetts' => 'MA',
            'Michigan' => 'MI',
            'Minnesota' => 'MN',
            'Mississippi' => 'MS',
            'Missouri' => 'MO',
            'Montana' => 'MT',
            'Nebraska' => 'NE',
            'Nevada' => 'NV',
            'New Hampshire' => 'NH',
            'New Jersey' => 'NJ',
            'New Mexico' => 'NM',
            'New York' => 'NY',
            'North Carolina' => 'NC',
            'North Dakota' => 'ND',
            'Ohio' => 'OH',
            'Oklahoma' => 'OK',
            'Oregon' => 'OR',
            'Pennsylvania' => 'PA',
            'Puerto Rico' => 'PR',
            'Rhode Island' => 'RI',
            'South Carolina' => 'SC',
            'South Dakota' => 'SD',
            'Tennessee' => 'TN',
            'Texas' => 'TX',
            'Utah' => 'UT',
            'Vermont' => 'VT',
            'Virginia' => 'VA',
            'Washington' => 'WA',
            'West Virginia' => 'WV',
            'Wisconsin' => 'WI',
            'Wyoming' => 'WY',
        );
        return $abbr[$stateName] ?? '';
    }
}