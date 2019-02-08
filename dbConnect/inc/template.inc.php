<?php
class Template
{
	private $template;
	
	public static function FromFile($filename)
	{
		return new Template(TEMPLATES_FOLDER . $filename, "file");
	}

    public static function FromFiles($header,$content,$navigation)
    {
        $headerTemplate=file_get_contents($header,1);
        $contentTemplate=file_get_contents($content,1);
        if($navigation!='')
        {
            $navigationTemplate=file_get_contents($navigation,1);
        }
        else
        {
            $navigationTemplate='';
        }
        $template = Template::FromFile('main.template.html');
        $template->SetValue('HEADER',$headerTemplate);
        $template->SetValue('NAVIGATION',$navigationTemplate);
        $template->SetValue('CONTENT',$contentTemplate);
        return $template;
    }
    public static function FromTwoFiles($content,$navigation)
    {
        $contentTemplate=file_get_contents($content,1);
        if($navigation!='')
        {
            $navigationTemplate=file_get_contents($navigation,1);
        }
        else
        {
            $navigationTemplate='';
        }
        $template = Template::FromFile('main.initial-template.html');
        $template->SetValue('NAVIGATION',$navigationTemplate);
        $template->SetValue('CONTENT',$contentTemplate);
        return $template;
    }
/*    public static function FromContentFiles($content,$navigation)
    {

    }*/
    public static function ContentFile($content)
    {
        $contentTemplate=file_get_contents($content,1);
        $template = Template::FromFile('main.content-template.html');
        $template->SetValue('CONTENT',$contentTemplate);
        return $template;
    }

	public static function FromString($template)
	{
		return new Template($template, "string");
	}
	
	function __construct($template, $resourceType = "string")
	{
		if ($resourceType == "file")
		{
			$this->template = file_get_contents($template);
			if ($this->template === FALSE)
				throw new Exception("Could not open template with filename: " . $template);
		}
		elseif ($resourceType == "string")
			$this->template = $template;
		else
			throw new Exception("Unexpected resource type encountered: " . $resourceType);
	}
	
	public function SetValue($name, $value)
	{
		if ($this->template === FALSE)
			throw new Exception("No template available.");		
		
		$this->template = str_replace("|[" . $name . "]|", $value, $this->template);
	}
	
	public function GetCompoundValue($name)
	{
		if ($this->template === FALSE)
			throw new Exception("No template available.");

		$firstPos = strpos($this->template, "|[" . $name . "]|");
		$lastPos = strpos($this->template, "|[/" . $name . "]|");
		if ($firstPos === FALSE || $lastPos === FALSE)
			throw new Exception("GET Compound value " . $name . " could not be found in the template.");
		
		// get current value without the tags 
		$firstValuePos = $firstPos + strlen("|[" . $name . "]|");
		$compoundValue = substr($this->template, $firstValuePos, ($lastPos - $firstValuePos));

		// remove value, but leave tags
		$this->template = substr($this->template, 0, $firstValuePos) . substr($this->template, $lastPos);
		
		return new Template($compoundValue);
	}
	
	public function AddToCompoundValue($name, $value)
	{
		if ($this->template === FALSE)
			throw new Exception("No template available.");		
		
		$lastPos = strpos($this->template, "|[/" . $name . "]|");
		if ($lastPos === FALSE)
			throw new Exception("ADD Compound value " . $name . " could not be found in the template.");
		
		$this->template = substr($this->template, 0, $lastPos) . $value . substr($this->template, $lastPos);
	}
	
	public function SetCompoundValue($name, $value)
	{
		if ($this->template === FALSE)
			throw new Exception("No template available.");		
		
		$tagSize = strlen("|[" . $name . "]|");
		
		$firstPos = strpos($this->template, "|[" . $name . "]|");
		$lastPos = strpos($this->template, "|[/" . $name . "]|");
		
		if ($firstPos === FALSE || $lastPos === FALSE)
			throw new Exception("SET Compound value " . $name . " could not be found in the template.");
		
		$this->template = substr($this->template, 0, $firstPos) . $value . substr($this->template, $lastPos+$tagSize+1);
	}
	
	public function RemoveCompoundValue($name)
	{
		if ($this->template === FALSE)
			throw new Exception("No template available.");		
		
		$tagSize = strlen("|[" . $name . "]|");
		
		$firstPos = strpos($this->template, "|[" . $name . "]|");
		$lastPos = strpos($this->template, "|[/" . $name . "]|");
		
		if ($firstPos === FALSE || $lastPos === FALSE)
			throw new Exception("REM Compound value " . $name . " could not be found in the template.");
		
		$this->template = substr($this->template, 0, $firstPos) . substr($this->template, $lastPos+$tagSize+1);		
	}
		
	public function Parse()
	{
		if ($this->template === FALSE)
			throw new Exception("No template available.");

		$firstPos = 0;
		while ($firstPos = strpos($this->template, "|[", $firstPos))
		{
			$lastPos = strpos($this->template, "]|", $firstPos);
			if ($lastPos !== FALSE)
				$this->template = substr($this->template, 0, $firstPos) . substr($this->template, $lastPos+2);
		}
		
		return $this->template;
	}
	
	public function Debug()
	{
		if ($this->template === FALSE)
			throw new Exception("No template available.");
		
		return $this->template;
	}
}

?>